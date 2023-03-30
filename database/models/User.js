const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs')

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
    password: { type: String, trim: true },
    tokens: [{
        token: {
            type: String,
        }
    }]
});

userSchema.statics.checkCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("unable to login");
    }
    const isUser = await bcryptjs.compare(password, user.password);

    if (!isUser) {
        throw new Error("unable to login");
    }
    return user
}

userSchema.methods.createToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'cornflakes') //, { expiresIn: "7 days"} 

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
    next();
})

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



