const Circle = require('../models/circleModel')
const mongoose = require('mongoose')

// get all circles
const getCircles = async (req, res) => {
    const circles = await Circle.find({}).sort({createdAt: -1})

    res.status(200).json(circles)
}


// get a single circle
const getCircle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }

    const circle = await Circle.findById(id)

    if (!circle) {
        return res.status(404).json({error: 'No such circle'})
    }

    res.status(200).json(circle)
}


// create new circle
const createCircle = async (req, res) => {
    const {title, description} = req.body

    // add doc to db
    try {
        const circle = await Circle.create({title, description})
        res.status(200).json(circle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a circle
const deleteCircle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }

    const circle = await Circle.findOneAndDelete({_id: id})

    if (!circle) {
        return res.status(404).json({error: 'No such circle'})
    }

    res.status(200).json(circle)
}


// update a circle
const updateCircle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }

    const circle = await Circle.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!circle) {
        return res.status(404).json({error: 'No such circle'})
    }

    res.status(200).json(circle)
}


module.exports = {
    getCircles,
    getCircle,
    createCircle,
    deleteCircle,
    updateCircle
}