// circleModel.js
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: String, required: true, },
    members: [{
      type: String, 
    }],
    location: { type: String, required: true },
    date: { type: Date, required: true },

  }, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)