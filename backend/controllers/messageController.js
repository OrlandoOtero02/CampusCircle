const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
    const userId = req.user._id
    const circleId = req.circle._id
    console.log(`\nUser Id: ${userId} Circle Id: ${circleId}`)

    //const messages = await Message.find({_id: id})

    //res.status(200).json(messages)
}

const createMessage = async (req, res) => {
    const {message, user} = req.body;

    let emptyFields = []
    if(!message) {
        emptyFields.push('message')
    }
    if(!user) {
        emptyFields.push('user')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    res.status(200).json(message)
}

module.exports = { 
    getMessages,
    createMessage,
}