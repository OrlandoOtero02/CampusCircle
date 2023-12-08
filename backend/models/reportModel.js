// reportModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the user-submitted reports
const reportSchema = new Schema({
    // ID of the user who submitted the report
    user_id: {
        type: String,
        required: true,
    },
    // Text content of the report
    content: {
        type: String,
        required: true,
    },
    // Array of strings representing URLs of images related to the report
    imageUrls: [
        {
            type: String,
        }
    ],
    // Geospatial field representing the location of the report (using GeoJSON)
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    // Timestamp of when the report was created
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Boolean flag indicating whether the report has been resolved
    isResolved: {
        type: Boolean,
        default: false,
    },
});

// Create and export the mongoose model for the 'Report' collection
module.exports = mongoose.model('Report', reportSchema);
