const jwt = require("jsonwebtoken")
const User = require("../models/User")

const authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'cornflakes')
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token })

        if (!user) throw new Error("Authentication Failed")

        req.token = token
        req.user = user
        next()

    } catch (e) {
        res.status(401).send({ error: "Authentication Failed. Please Authenticate First." })
    }
}

module.exports = authUser