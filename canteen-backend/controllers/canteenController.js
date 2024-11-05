const db = require('../config/db');  // This connects to your MySQL database

// Function to handle fetching canteens
const getCanteens = async (req, res) => {
    try {
        const [canteens] = await db.query('SELECT * FROM canteens');  // Example query
        res.json(canteens);
    } catch (error) {
        console.error('Error fetching canteens:', error);
        res.status(500).json({ error: 'Failed to fetch canteens' });
    }
};

module.exports = { getCanteens };
