use canteen;
-- Create User Table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    institution_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Staff', 'CanteenStaff') NOT NULL
);
-- Create Canteen Table
CREATE TABLE Canteens (
    canteen_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);
-- Create MenuItem Table with Composite Primary Key
CREATE TABLE MenuItem (
    item_id INT NOT NULL,
    canteen_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (item_id, canteen_id),
    -- Composite primary key
    FOREIGN KEY (canteen_id) REFERENCES Canteens(canteen_id) ON DELETE CASCADE
);
-- Create Orders Table with Composite Primary Key
mysql > CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    -- Auto-increment primary key
    user_id INT NOT NULL,
    canteen_id INT NOT NULL,
    status ENUM(
        'Pending',
        'Preparing',
        'Ready',
        'Completed',
        'Cancelled'
    ) DEFAULT 'Pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    UNIQUE (order_id, canteen_id),
    -- Composite unique constraint
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (canteen_id) REFERENCES Canteens(canteen_id) ON DELETE CASCADE
);
-- Create OrderItem Table with Surrogate Key and Composite Unique Constraint
CREATE TABLE OrderItem (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    -- Surrogate primary key
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    UNIQUE (order_id, item_id),
    -- Enforce uniqueness of order_id and item_id
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES MenuItem(item_id) ON DELETE CASCADE
);
-- Create Payment Table
CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);
DELIMITER // mysql > mysql > CREATE PROCEDURE create_order(
->IN p_user_id INT,
->IN p_canteen_id INT,
->IN p_cart JSON,
->IN p_total_amount DECIMAL(10, 2)->
)->BEGIN->
DECLARE new_order_id INT;
->
DECLARE item_id INT;
->
DECLARE item_quantity INT;
->
DECLARE item_price DECIMAL(10, 2);
->
DECLARE idx INT DEFAULT 0;
->
DECLARE cart_length INT;
->->-- Insert into Orders and retrieve the auto-generated order_id
->
INSERT INTO Orders (user_id, canteen_id, total_amount)->
VALUES (p_user_id, p_canteen_id, p_total_amount);
->->-- Get the last inserted order ID
->
SET new_order_id = LAST_INSERT_ID();
->->-- Get the length of the JSON cart
->
SET cart_length = JSON_LENGTH(p_cart);
->->-- Loop through the cart and insert each item into the OrderItem table
->WHILE idx < cart_length DO->-- Extract item data from the JSON array
->
SET item_id = JSON_UNQUOTE(
        JSON_EXTRACT(p_cart, CONCAT('$[', idx, '].item_id'))
    );
->
SET item_quantity = JSON_UNQUOTE(
        JSON_EXTRACT(p_cart, CONCAT('$[', idx, '].quantity'))
    );
->
SET item_price = JSON_UNQUOTE(
        JSON_EXTRACT(p_cart, CONCAT('$[', idx, '].price'))
    );
->->-- Insert into OrderItem table
->
INSERT INTO OrderItem (order_id, item_id, quantity, price)->
VALUES (new_order_id, item_id, item_quantity, item_price);
->->-- Increment index to move to the next item in the cart
->
SET idx = idx + 1;
->
END WHILE;
->->-- Return the new order ID
->
SELECT new_order_id AS order_id;
->->
END // DELIMITER;
DELIMITER // mysql > mysql > CREATE TRIGGER validate_institution_id->BEFORE
INSERT ON Users->FOR EACH ROW->BEGIN->-- Check if the institution_id starts with 'PES'
->IF LEFT(NEW.institution_id, 3) != 'PES' THEN->SIGNAL SQLSTATE '45000'->
SET MESSAGE_TEXT = 'Institution ID must start with "PES"';
->
END IF;
->
END;
->// DELIMITER;
DELIMITER // CREATE TRIGGER validate_password_length BEFORE
INSERT ON Users FOR EACH ROW BEGIN -- Check if the password length is less than 8 characters
    IF LENGTH(NEW.password) < 8 THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Password must be at least 8 characters long.';
END IF;
END;
// DELIMITER;