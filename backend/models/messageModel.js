const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }, 
    circles: [
        {
            type: String,
        }
    ],
}, {timestamps: true})

module.exports = mongoose.model('Message', messageSchema)