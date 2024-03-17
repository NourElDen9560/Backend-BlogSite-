const jwt = require('jsonwebtoken');
const UserModel = require('../database/models/user.model');
const authUser = async(req,res, next)=>{
    try{

        const token = req.header("Authorization").replace("bearer ", "")
        console.log(token)

     const user=  await auth(token)
        // continue
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Problem in token authentication"
        })
    }
}
const auth =async (token) => {
    console.log("hello")

    const decodedToken = jwt.verify(token, "123")

    const userData = await UserModel.findOne({
        _id:decodedToken._id,
        'tokens.token': token
    })
    console.log(userData)
    if(!userData) 
    throw new Error("unauth")
    return userData
}
const authAdmin = async(req, res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const user = await auth(token)
        if(user.type != "admin") throw new Error("you are not admin")
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"unauth"
        })
       
    }
}
const authAuthor = async(req, res, next)=>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const user = await CheckUser(token)
        if(user.type != "auhtor") throw new Error("you not have author role ")
        req.user = user
        req.token = token
        next()
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"unauth"
        })
       
    }
}
module.exports = {authUser , authAdmin , authAuthor}