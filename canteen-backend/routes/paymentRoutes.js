const express = require('express');
const router = express.Router();
const Payment = require('../models/index');

// Process a payment
router.post('/', async (req, res) => {
    const { order_id, amount } = req.body;
    try {
        const newPayment = await Payment.create({ order_id, amount, status: 'Completed' });
        res.status(201).json({ message: 'Payment processed', payment_id: newPayment.payment_id });
    } catch (error) {
        res.status(500).json({ error: 'Error processing payment' });
    }
});

module.exports = router;
