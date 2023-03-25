const mongoose = require("mongoose")

const relationSchema = new mongoose.Schema({
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [
        {
            relation: {
                type: String,
                required: true,
            },
            member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }]
})

const Relation = new mongoose.model('Relation', relationSchema)

module.exports = Relation