const express = require('express');
const router = express.Router();
const canteenController = require('../controllers/canteenController');

// Define GET /canteens route to fetch list of canteens
router.get('/', canteenController.getCanteens);

module.exports = router;
