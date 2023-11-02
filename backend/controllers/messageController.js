const Message = require('../models/messageModel')
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
    const userId = req.user._id
    const circleId = req.circle._id

    const messages = await Message.find({_id: id})

    res.status(200).json(messages)
}