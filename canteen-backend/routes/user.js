const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db = require('../config/db'); // Sequelize instance

router.post('/', async (req, res) => {
    const { name, institution_id, password, role, email } = req.body;

    try {
        // Check if the user already exists in the database
        const [existingUser] = await db.query(
            'SELECT * FROM Users WHERE institution_id = ?',
            { replacements: [institution_id], type: QueryTypes.SELECT }
        );

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before inserting
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            // Insert the new user into the database
            const [userdata] = await db.query(
                'INSERT INTO Users (name, institution_id, password_hash, role, email) VALUES (?, ?, ?, ?, ?)',
                { replacements: [name, institution_id, hashedPassword, role, email], type: QueryTypes.INSERT }
            );
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            // Check if the error message is from the institution_id check
            if (err.message.includes('Institution ID must start with "PES"')) {
                return res.status(400).json({ message: err.message });
            }
            console.error(err);
            res.status(500).json({ message: 'Institution ID must start with "PES"' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Institution ID must start with "PES"' });
    }
});

module.exports = router;
