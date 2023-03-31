const mongoose = require("mongoose")

const vaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        type: Boolean,
        default: true
    },
    count: {
        type: Number,
        default: 100
    },

})

const Vaccine = new mongoose.model('Vaccine', vaccineSchema)

module.exports = Vaccine