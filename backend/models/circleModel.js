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
    members: {
        type: Array,
        //required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Circle', circleSchema)