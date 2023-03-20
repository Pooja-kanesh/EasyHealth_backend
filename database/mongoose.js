const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/EasyHealthDB')
    .then(() => console.log("database connected"))
    .catch(e => console.log(e))
