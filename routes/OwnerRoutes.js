const express = require('express');
const authMiddleware = require('../middleware/AuthMiddleware');
const { get_all_owners, bulk_upload } = require('../controllers/OwnerController');

const router = express.Router()

router.post('/upload', authMiddleware , bulk_upload)
router.get("/owners", authMiddleware, get_all_owners)

module.exports = router