const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models/index');

// Place a new order
router.post('/', async (req, res) => {
    const { user_id, canteen_id, items, total_amount } = req.body;
    try {
        const newOrder = await Order.create({ user_id, canteen_id, total_amount });
        await OrderItem.bulkCreate(items.map(item => ({ ...item, order_id: newOrder.order_id })));
        res.status(201).json({ message: 'Order placed successfully', order_id: newOrder.order_id });
    } catch (error) {
        res.status(500).json({ error: 'Error placing order' });
    }
});

// Fetch orders for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { user_id: req.params.userId } });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

module.exports = router;
