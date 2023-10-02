const express = require('express')

const {
    getCircles,
    getCircle,
    createCircle,
    deleteCircle,
    updateCircle,
} = require('../controllers/circleController')

const router = express.Router()

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