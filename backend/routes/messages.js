const express = require('express')

const {
    getMessages,
} = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')

const router = express.router()

router.use(requireAuth)

// GET messages of a circle
router.get('/', getMessages)

module.exports = router