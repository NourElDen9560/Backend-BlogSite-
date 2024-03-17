const mongoose = require('mongoose')
const express = require("express")
const http = require('http').Server(express)
const app = express()
const cors = require("cors")
const path = require("path")

const db_url = "mongodb+srv://nour:5dLadSUEU5jtYHtT@cluster0.knrjgpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Blogwebsite"
mongoose.connect( db_url ).then(()=>{
    console.log("Connect")
}).catch(err => console.log(err)); 
//const connection_option={ useNewUrlParser: true, useUnifiedTopology: true }
require("../BlogBackend/database/models/user.model")
require("../BlogBackend/database/models/post.model")

app.use(express.json())
app.use(express.urlencoded({ extended   : true }))
app.use(cors())

const userRoutes = require("../BlogBackend/routes/user.router")
const postRoutes = require("../BlogBackend/routes/post.router")
app.use("/user",userRoutes)
app.use("/post",postRoutes)



app.listen(3000,()=>{
    console.log("Listening")
})

app.all("*", (req,res)=>{
    res.status(404).send({
        apiStatus:false,
        message:"No API With This url or Invalid API"
    })
})

module.exports = app