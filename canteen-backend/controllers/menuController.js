// controllers/menuController.js
const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db = require('../config/db'); // Sequelize instance

const getMenuItemsByCanteen = async (req, res) => {
    const { canteenId } = req.params;

    // Log canteenId to ensure it's being received correctly
    console.log("Requested canteenId:", canteenId);

    try {
        const menuItems = await db.query(
            'SELECT * FROM menuitem WHERE canteen_id = :canteenId',
            {
                replacements: { canteenId }, // Use named replacements
                type: QueryTypes.SELECT // Specify the query type
            }
        );

        // Log fetched menu items for debugging
        console.log("Fetched menu items:", menuItems);

        res.json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
};

module.exports = { getMenuItemsByCanteen };
