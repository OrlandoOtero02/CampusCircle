const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    circle_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Circle',
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);