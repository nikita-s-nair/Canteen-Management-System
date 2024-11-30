const express = require('express');
const router = express.Router();
const { Payment } = require('../models');

// Cancel Order
router.delete('/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        // Update order status to 'Cancelled'
        await db.query(
            `UPDATE Orders SET status = 'Cancelled' WHERE order_id = ?`,
            { replacements: [orderId], type: QueryTypes.UPDATE }
        );
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Failed to cancel order' });
    }
});

module.exports = router;