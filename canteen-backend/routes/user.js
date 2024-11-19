const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db = require('../config/db'); // Sequelize instance

router.post('/', async (req, res) => {
    const { name, institution_id, password, role, email } = req.body;  // Include email here

    try {
        const [existingUser] = await db.query(
            'SELECT * FROM Users WHERE institution_id = ?',
            { replacements: [institution_id], type: QueryTypes.SELECT }
        );

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO Users (name, institution_id, password_hash, role, email) VALUES (?, ?, ?, ?, ?)', // Include email in the query
            { replacements: [name, institution_id, hashedPassword, role, email], type: QueryTypes.INSERT }
        );

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
