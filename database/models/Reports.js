const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    name: String,
    link: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Reports = mongoose.model('Reports', reportSchema)

module.exports = Reports