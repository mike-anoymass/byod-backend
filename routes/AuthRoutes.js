const express = require('express');
const { login, getAuthUser } = require('../controllers/AuthController');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router()

router.post('/login', login)
router.get('/', authMiddleware, getAuthUser)

module.exports = router