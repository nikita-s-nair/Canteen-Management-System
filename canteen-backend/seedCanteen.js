const sequelize = require('./config/db');
const Canteen = require('./models/index');

const seedCanteens = async () => {
    try {
        await sequelize.sync();  // Ensure the database is ready
        
        // Sample canteens to insert
        const canteens = [
            { name: 'Main Canteen', location: 'Building A' },
            { name: 'Sports Canteen', location: 'Sports Complex' },
            { name: 'Library Canteen', location: 'Library Basement' },
        ];

        // Insert canteens into the database
        await Canteen.bulkCreate(canteens);
        console.log("Canteens have been added to the database.");

        // Close the connection
        await sequelize.close();
    } catch (error) {
        console.error("Error seeding canteens:", error);
    }
};

seedCanteens();
