const express = require('express');
const authMiddleware = require('../middleware/AuthMiddleware');
const { bulk_upload, get_all_districts } = require('../controllers/DistrictController');

const router = express.Router()

router.post('/upload', authMiddleware , bulk_upload)
router.get("/districts", authMiddleware, get_all_districts)

module.exports = router