require('./database/mongoose.js')
const express = require('express')
const cors = require('cors')

const authUser = require("./database/middlewares/authUser")
const User = require("./database/models/User.js")
const Details = require("./database/models/Details.js")
const Relation = require('./database/models/Relation.js')

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const user = new User({ ...req.body })
        const head = new Relation({ head: user._id })

        await user.save()
        await head.save()

        head.members = head.members.concat({ relation: "self", member: user._id })
        await head.save()

        const token = await user.createToken();

        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

app.post('/login', async (req, res) => {
    try {
        const user = await User.checkCredentials(req.body.email)
        const token = await user.createToken()

        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/logout', authUser, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return req.token !== token.token
        })
        await req.user.save()
        res.status(200).send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})

app.post("/user/addMember", authUser, async (req, res) => {
    try {
        const head = await Relation.findOne({ head: req.user._id })
        if (!head) throw new Error("User Not Found")

        const newMember = new User({ name: req.body.name })
        await newMember.save()

        head.members = head.members.concat({ relation: req.body.relation, member: newMember._id })
        await head.save()

        res.status(201).send(head)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.get("/user/members", authUser, async (req, res) => {
    try {
        const userMembers = await Relation.findOne({ head: req.user._id })
        // const arr = userMembers.members

        // const detail = await Details.findOne({ user: arr[0]._id })
        // console.log(detail)
        // console.log(arr)
        res.status(200).send(userMembers)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get("/user/:id", authUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) throw new Error()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post("/user/addDetails", authUser, async (req, res) => {
    try {
        const userDetail = new Details({ ...req.body })
        await userDetail.save()

        res.status(200).send(userDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get("/user/getDetails/:id", authUser, async (req, res) => {
    try {
        const details = await Details.findOne({ user: req.params.id })
        console.log(details)
        if (!details) throw new Error()
        res.status(200).send(details)
    } catch (e) {
        res.status(404).send(e)
    }
})

app.listen(PORT, () => {
    console.log("server started")
})