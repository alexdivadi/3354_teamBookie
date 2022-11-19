const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("MONGO_ADDRESS_HERE")

app.use('/', require("../routes/bookRoute.js"))

app.listen(3001, function() {
    console.log("Express server running on Port 3001")
})