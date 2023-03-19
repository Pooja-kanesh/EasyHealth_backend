const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
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
    familyMembers: [
        {
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            relation: {
                type: String,
                required: true
            }
        }
    ],
    age: {
        type: Number,
        default: 0
    },
    height: Number,
    weight: Number,
    blood_group: String,
    illness: String,
});

userSchema.methods.createToken = async function () {
    const token = jwt.sign({ _id: this._id.toString() }, 'cornflakes') //, { expiresIn: "7 days"} 
    return token
}

userSchema.virtual("reports", {
    ref: "Reports",
    localField: "_id",
    foreignField: "user"
})



const User = new mongoose.model("User", userSchema);

module.exports = User;