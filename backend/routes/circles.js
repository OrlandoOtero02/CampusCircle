//circle.js
const express = require('express')

const {
    getCircles,
    getCircle,
    createCircle,
    deleteCircle,
    updateCircle,
} = require('../controllers/circleController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all circles
router.get('/', getCircles)

// GET a single circle
router.get('/:id', getCircle)

// POST a new circle
router.post('/', createCircle)

// DELETE a circle
router.delete('/:id', deleteCircle)

// UPDATE a circle
router.patch('/:id', updateCircle)

module.exports = router