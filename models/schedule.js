const mongoose = require('mongoose');
const scheduleSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
},{strict: true});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule