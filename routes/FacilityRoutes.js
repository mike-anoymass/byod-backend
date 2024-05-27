const express = require('express');
const authMiddleware = require('../middleware/AuthMiddleware');
const { get_all_facilities, create_facility } = require('../controllers/FacilityController');

const router = express.Router()

router.get('/facilities', authMiddleware ,get_all_facilities)
router.post("/create_facility", authMiddleware, create_facility)

module.exports = router