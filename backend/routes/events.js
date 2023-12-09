//events.js
const express = require('express')

const {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    joinEvent,
    leaveEvent,
    approveEvent,
    forAdmin1,
    
} = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all events
router.get('/', getEvents)

// GET a single event
router.get('/:id', getEvent)

// POST a new event
router.post('/', createEvent)

// DELETE a event
router.delete('/:id', deleteEvent)

router.patch('/approveEvent/:eventId', approveEvent)

router.get('/forAdmin', forAdmin1);

module.exports = router