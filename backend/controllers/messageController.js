const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
    const circle1 = req.params.id;
    console.log(`\n Circle ID: ${circle1}\n`)
    const messages = await Message.find({"circles" : {$in : circle1}}).sort({createdAt: 1})

    res.status(200).json(messages)
}

const createMessage = async (req, res) => {
    const {message, username, circle, isDM} = req.body;
    const user = req.user._id;

    let emptyFields = []
    if(!message) {
        emptyFields.push('message')
    }
    if(!user) {
        emptyFields.push('user')
    }
    if (!circle) {
        emptyFields.push('circle')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    const circles = []
    circles.push(circle)
    if (isDM) circles.push(user)
    try {
        const message1 = await Message.create({user, username, message, circles})
        res.status(200).json(message1)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    getMessages,
    createMessage,
}