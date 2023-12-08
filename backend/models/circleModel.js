// circleModel.js
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const circleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [
        {
            type: String,
        }
    ],
    isPrivate: {
        type: Boolean,
        default: false,
    },
    approvedEvents:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'    
    }]
}, { timestamps: true })

module.exports = mongoose.model('Circle', circleSchema)