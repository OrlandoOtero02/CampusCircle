//events.js
const express = require('express')

const {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
} = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all events
router.get('/events', getEvents)

// GET a single event
router.get('/event/:id', getEvent)

// POST a new event
router.post('/', createEvent)

// DELETE a event
router.delete('/event/:id', deleteEvent)


module.exports = router