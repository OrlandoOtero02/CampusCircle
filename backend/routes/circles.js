const express = require('express')

const Circle = require('../models/circleModel')

const router = express.Router()

// GET all circles
router.get('/', (req, res) => {
    res.json({
        msg: 'GET all circles'
    })
})

// GET a single circle
router.get('/:id', (req, res) => {
    res.json({
        msg: 'GET a single circle'
    })
})

// POST a new circle
router.post('/', async (req, res) => {
    const {title, description} = req.body

    try {
        const circle = await Circle.create({title, description})
        res.status(200).json(circle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a circle
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'DELETE a circle'
    })
})

// UPDATE a circle
router.patch('/:id', (req, res) => {
    res.json({
        msg: 'UPDATE a circle'
    })
})

module.exports = router