const mongoose = require("mongoose")

const vaccineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 0
    },

})

const Vaccine = mongoose.model('Vaccine', vaccineSchema)
module.exports = Vaccine