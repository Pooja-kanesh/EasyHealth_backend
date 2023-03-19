const mongoose = require("mongoose")

const Center = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: Number,
        required: true,
        unique: true,
    },
    state: {
        type: String,

    },
    district: {
        type: String,

    },
})