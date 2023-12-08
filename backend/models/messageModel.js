const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    }, 
    timestamp: {
        type: Date,
        required: true,
    },
    circle: {
        type: String,
    },
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)