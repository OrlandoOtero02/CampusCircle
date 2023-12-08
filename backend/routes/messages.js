const express = require('express')

const {
    getMessages,
    createMessage,
} = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET messages of a circle
router.get('/', getMessages)

router.post('/', createMessage)

module.exports = router