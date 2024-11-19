// routes/order.js
const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models'); // Import models

router.post('/place-order', async (req, res) => {
    const { userId, canteenId, cartItems, totalAmount } = req.body;

    try {
        const order = await Order.create({
            user_id: userId,
            canteen_id: canteenId,
            status: 'Pending',
            total_amount: totalAmount,
        });

        const orderItems = cartItems.map(item => ({
            order_id: order.order_id,
            item_id: item.item_id,
            quantity: item.quantity,
            price: item.price,
        }));

        await OrderItem.bulkCreate(orderItems);

        res.status(201).json({ success: true, message: 'Order placed successfully!', order });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Failed to place order.' });
    }
});

module.exports = router;
