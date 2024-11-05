const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,  // Set to true if you want to see SQL queries in the console
    }
);

module.exports = sequelize;
