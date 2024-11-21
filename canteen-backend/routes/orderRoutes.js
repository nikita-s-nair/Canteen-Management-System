const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { QueryTypes } = require('sequelize');

// Create an order
router.post('/', async (req, res) => {
    const { userId, canteenId, cartData, totalAmount, paymentMode } = req.body;

    try {
        console.log('Validating input...');
        // Validate input
        if (!userId || !canteenId || !cartData || !totalAmount || !paymentMode) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('Calling stored procedure to create order...');
        // Call the stored procedure
        const [orderResult] = await db.query(
            'CALL CreateOrder(:userId, :canteenId, :cartData, :totalAmount, :paymentMode)',
            {
                replacements: {
                    userId,
                    canteenId,
                    cartData: JSON.stringify(cartData), // Convert cartData to JSON string
                    totalAmount,
                    paymentMode
                },
                type: QueryTypes.RAW
            }
        );
        console.log(orderResult);

        const orderId = orderResult.order_id || null; // Adjust based on the actual response format of `CreateOrder`

        if (!orderId) {
            return res.status(500).json({ error: 'Failed to create order, orderId not returned' });
        }
        console.log('Request Body:', req.body);
        console.log('Executing query with:', {
            userId,
            canteenId,
            cartData: JSON.stringify(cartData),
            totalAmount,
            paymentMode,
        });
        console.log('Stored procedure result:', orderResult);
        console.log('Sending response:', {
            message: 'Order created successfully',
            orderId,
            totalAmount,
            paymentMode,
        });
        
        // Send a successful response back to the client
        res.status(201).json({
            message: 'Order created successfully',
            orderId,
            totalAmount,
            paymentMode,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        console.log('Error occurred at line:', error.stack);
        res.status(500).json({ error: 'Error creating order' });
    }
});

module.exports = router;
