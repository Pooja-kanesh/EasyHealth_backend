const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOfBirth: {
        type: Number,
        required: true,
        default: 0
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true
    },
    majorIllness: String,
    reports: [{
        date: {
            type: Date
        },
        report: {
            type: String
        }
    }]
})

const Details = new mongoose.model('Details', detailsSchema)

module.exports = Details