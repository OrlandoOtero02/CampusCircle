//circle.js
const express = require('express')

const {
    getCircles,
    getCircle,
    createCircle,
    deleteCircle,
    updateCircle,
    getUserCircles,
    getJoinableCircles,
    joinCircle,
    leaveCircle,
} = require('../controllers/circleController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all circles
router.get('/', getCircles)

router.get('/user', getUserCircles)

router.get('/joinable', getJoinableCircles)

// GET a single circle
router.get('/:id', getCircle)

// POST a new circle
router.post('/', createCircle)

// DELETE a circle
router.delete('/:id', deleteCircle)

// UPDATE a circle
router.patch('/u/:id', updateCircle)

router.patch('/add/:id', joinCircle)

router.patch('/leave/:id', leaveCircle)

module.exports = router