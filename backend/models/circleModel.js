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
        required: true
    },
    members: [
        {
        userid: {
            type: String, 
        }
    }],
}, { timestamps: true })

module.exports = mongoose.model('Circle', circleSchema)