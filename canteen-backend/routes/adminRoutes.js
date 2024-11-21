const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { QueryTypes } = require('sequelize');

// 1. Get all canteens
router.get('/canteens', async (req, res) => {
    try {
        console.log('Fetching canteens...'); // Add logging
        const [canteens] = await db.query(
            'SELECT * FROM Canteens',
            { type: QueryTypes.SELECT }
        );
        console.log('Canteens found:', canteens); // Log found canteens
        res.status(200).json(canteens);
    } catch (error) {
        console.error('Error fetching canteens:', error);
        res.status(500).json({ error: 'Failed to fetch canteens', details: error.message });
    }
});

// 2. Add a new canteen
router.post('/canteens', async (req, res) => {
    const { name, location } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Canteens (name, location) VALUES (?, ?)',
            { replacements: [name, location], type: QueryTypes.INSERT }
        );
        res.status(201).json({ message: 'Canteen added successfully', canteenId: result });
    } catch (error) {
        console.error('Error adding canteen:', error);
        res.status(500).json({ error: 'Failed to add canteen' });
    }
});

// 3. Get menu items for a specific canteen
router.get('/canteens/:canteenId/menu', async (req, res) => {
    const { canteenId } = req.params;
    try {
        const [menuItems] = await db.query(
            'SELECT * FROM MenuItem WHERE canteen_id = ?',
            { replacements: [canteenId], type: QueryTypes.SELECT }
        );
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

// 4. Add a new menu item
router.post('/canteens/:canteenId/menu', async (req, res) => {
    const { canteenId } = req.params;
    const { name, description, price, availability } = req.body;
    try {
        await db.query(
            'INSERT INTO MenuItem (canteen_id, name, description, price, availability) VALUES (?, ?, ?, ?, ?)',
            { replacements: [canteenId, name, description, price, availability], type: QueryTypes.INSERT }
        );
        res.status(201).json({ message: 'Menu item added successfully' });
    } catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'Failed to add menu item' });
    }
});

// 5. Edit a menu item
router.put('/canteens/:canteenId/menu/:itemId', async (req, res) => {
    const { canteenId, itemId } = req.params;
    const { name, description, price, availability } = req.body;
    try {
        await db.query(
            'UPDATE MenuItem SET name = ?, description = ?, price = ?, availability = ? WHERE canteen_id = ? AND item_id = ?',
            { replacements: [name, description, price, availability, canteenId, itemId], type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: 'Menu item updated successfully' });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});

// 6. Delete a menu item
router.delete('/canteens/:canteenId/menu/:itemId', async (req, res) => {
    const { canteenId, itemId } = req.params;
    try {
        await db.query(
            'DELETE FROM MenuItem WHERE canteen_id = ? AND item_id = ?',
            { replacements: [canteenId, itemId], type: QueryTypes.DELETE }
        );
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});

module.exports = router;
