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
