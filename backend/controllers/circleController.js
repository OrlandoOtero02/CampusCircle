//circleController.js
const Circle = require('../models/circleModel')
const mongoose = require('mongoose')

// get all circles
const getCircles = async (req, res) => {
    const user_id = req.user._id

    const circles = await Circle.find({}).sort({createdAt: -1})

    res.status(200).json(circles)
}

const getUserCircles = async (req, res) => {
    const user_id = req.user._id

    const circles = await Circle.find({"members" : { $in : user_id}}).sort({createdAt: -1})

    res.status(200).json(circles)
}

const getJoinableCircles = async (req, res) => {
    const user_id = req.user._id;

    // Define the query to find joinable circles
    const query = {
        $or: [
            { isPrivate: false },  // Check if isPrivate is false
            { $and: [{ isPrivate: true }, { user_id: { $in: req.user.following } }] }  // Check if isPrivate is true and user_id is in user.following array
        ]
    };

    const circles = await Circle.find(query).sort({ createdAt: -1 });

    res.status(200).json(circles);
};


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

    //error for empty fields
    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!description) {
        emptyFields.push('description')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const members = req.user._id
        const circle = await Circle.create({title, description, user_id, members})
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


const joinCircle = async (req,res) => {
    const { id }  = req.params
    const userId = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }
    try {
    const circle = await Circle.findByIdAndUpdate({_id: id},
        { $push: { members: userId }})
        res.status(200).json(circle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const leaveCircle = async (req,res) => {
    const { id }  = req.params
    const userId = req.user._id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such circle'})
    }
    try {
    const circle = await Circle.findByIdAndUpdate({_id: id},
        { $pull: { members: userId }})
        res.status(200).json(circle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getCircles,
    getUserCircles,
    getJoinableCircles,
    getCircle,
    createCircle,
    deleteCircle,
    updateCircle,
    joinCircle,
    leaveCircle,
}