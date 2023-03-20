require('./database/mongoose.js')
const express = require('express')

const User = require("./database/models/User.js")
const Details = require("./database/models/Details")

const app = express()
const PORT = 8000

app.use(express.json())
app.post('/register', async (req, res) => {
    try {
        const user = new User({ ...req.body })

        await user.save()
        const token = await user.createToken();

        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

// app.patch("/user/addMember", async (req, res) => {
//     try {
//         const head = await User.findOne({ email: req.body.email })
//         if (!head) throw new Error("Not Found")

//         const member = { ...req.body }
//         delete member.email

//         head.familyMembers = head.familyMembers.concat({ ...member })
//         await head.save()

//         res.status(201).send(head)
//     } catch (e) {
//         res.status(404).send(e)
//     }
// })

app.post("/user/addDetails", async (req, res) => {
    try {
        const userDetail = new Details({ ...req.body })
        await userDetail.save()

        console.log(userDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(PORT, () => {
    console.log("server started")
})