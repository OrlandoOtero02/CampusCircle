const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
    const userId = req.user._id
    //const circleId = req.circle._id
    //console.log(`\nUser Id: ${userId} Circle Id: ${circleId}`)

    const messages = await Message.find({"circle" : {$in : "65724c347e9d68c71b6fe7d8"}}).sort({createdAt: 1})

    res.status(200).json(messages)
}

const createMessage = async (req, res) => {
    const {message, username} = req.body;
    const user = req.user._id;

    console.log(`\nUser Id: ${user} Message: ${message}\n`);

    const circle = "65724c347e9d68c71b6fe7d8"; //req.circle._id
    console.log(`\nCircle Id: ${circle}\n`)

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

    try {
        console.log(`\n Username: ${username}\n`)
        const message1 = await Message.create({user, username, message, circle})
        res.status(200).json(message1)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    getMessages,
    createMessage,
}