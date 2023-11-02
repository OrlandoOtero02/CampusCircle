const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    message: {
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