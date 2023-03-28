const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    contact: {
        type: Number,
        unique: true,
        sparse: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
});

userSchema.statics.checkCredentials = async (email) => {
    const user = await User.findOne({ email })

    if (!user) throw new Error("User not found")

    return user
}

userSchema.methods.createToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'cornflakes') //, { expiresIn: "7 days"} 

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.virtual("details", {
    ref: "Details",
    localField: "_id",
    foreignField: "user"
})

userSchema.virtual("relations", {
    ref: "Relation",
    localField: "_id",
    foreignField: "head"
})

const User = new mongoose.model("User", userSchema);

module.exports = User;



