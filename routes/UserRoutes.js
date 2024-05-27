const express = require('express');
const { register, getAll, getOne, update, del } = require('../controllers/UserController');
const authMiddleware = require('../middleware/AuthMiddleware')

const router = express.Router()

router.post('/register', register)
router.get("/", getAll)
router.get('/:id', getOne)
router.put('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, del)

module.exports = router