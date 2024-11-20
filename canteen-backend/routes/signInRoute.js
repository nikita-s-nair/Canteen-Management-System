const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db = require('../config/db'); // Sequelize instance

router.post('/', async (req, res) => {
    const { email, password } = req.body;  // Updated to email

    try {
        // Query the database using email
        const [user] = await db.query(
            'SELECT * FROM users WHERE email = ?',  // Searching by email now
            { replacements: [email], type: QueryTypes.SELECT }
        );

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                user_id: user.user_id,
                email: user.email,  // Include email here
                name: user.name,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
