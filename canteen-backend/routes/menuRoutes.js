// routes/menu.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/:canteenId', menuController.getMenuItemsByCanteen);

module.exports = router;
