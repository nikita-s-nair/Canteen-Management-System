const express = require('express');
const router = express.Router();
const { Payment } = require('../models'); // Assuming you have a Payment model

// POST request to process payment
router.post('/', async (req, res) => {
    const { orderId, userId, paymentMode, amount } = req.body;

    try {
        // Insert payment details into the payment_table
        const payment = await Payment.create({
            order_id: orderId,
            user_id: userId,
            payment_mode: paymentMode,
            amount: amount,
        });

        res.status(200).json({
            message: 'Payment processed successfully',
            paymentId: payment.payment_id,
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

module.exports = router;
