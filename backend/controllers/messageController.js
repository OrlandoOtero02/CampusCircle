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
    const {message} = req.body;
    const user = req.user._id;

    console.log(`\nUser Id: ${user} Message: ${message}\n`);

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
    console.log("\nIm Getting To Here\n")
    try {
        //const circle_id = req.circle._id
        const message1 = await Message.create({user, message})
        res.status(200).json(message1)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    getMessages,
    createMessage,
}