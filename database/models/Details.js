const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dob: {
        type: String,
        required: true,
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
    majorIllness: {
        type: String,
        default: "None"
    },
    reports: [{
        date: {
            type: Date,
            default: new Date()
        },
        report: {
            type: String
        }
    }]
})

const Details = new mongoose.model('Details', detailsSchema)

module.exports = Details