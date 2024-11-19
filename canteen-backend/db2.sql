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
CREATE TABLE Orders (
    order_id INT NOT NULL,
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
    PRIMARY KEY (order_id, canteen_id),
    -- Composite primary key
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (canteen_id) REFERENCES Canteens(canteen_id) ON DELETE CASCADE
);
-- Create OrderItem Table with Surrogate Key and Composite Unique Constraint
CREATE TABLE OrderItem (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    UNIQUE (order_id, item_id),
    -- Enforce uniqueness of order_id and item_id combination
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