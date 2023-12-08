//eventController.js
const Event = require('../models/eventModel')
const User = require('../models/userModel'); // Adjust the path as per your project structure
const mongoose = require('mongoose')


const getEvents = async (req, res) => {
    const circle_id = req.circle._id

    const events = await Event.find({}).sort({createdAt: -1})

    res.status(200).json(events)
}


// get a single event
const getEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findById(id)

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}


// create new event
const createEvent = async (req, res) => {
    const {title, description, approved, date, time, location, circle_id} = req.body
    console.log()
    //error for empty fields
    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(!date) {
        emptyFields.push('date')
    }
    if(!time) {
        emptyFields.push('time')
    }
    if(!location) {
        emptyFields.push('location')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const participants = req.user._id
        const event = await Event.create({title, description, approved, date, time, location, participants, circle_id})
        res.status(200).json(event)
        console.log(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a event
const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findOneAndDelete({_id: id})

    if (!event) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(circle)
}


// update a circle
const updateEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }

    const event = await Event.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!evente) {
        return res.status(404).json({error: 'No such event'})
    }

    res.status(200).json(event)
}


const joinEvent = async (req,res) => {
    const { id }  = req.params
    const userId = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }
    try {
    const event = await Event.findByIdAndUpdate({_id: id},
        { $push: { participants: userId }})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const leaveEvent = async (req,res) => {
    const { id }  = req.params
    const userId = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
    }
    try {
    const event = await Event.findByIdAndUpdate({_id: id},
        { $pull: { members: userId }})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    joinEvent,
    leaveEvent,
}