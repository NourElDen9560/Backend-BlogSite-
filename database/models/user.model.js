const mongoose = require("mongoose")
const validator = require("validator")
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs")


const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowecase:true,
        required:true
    }, 
    role:{
        type:String,
        trim:true,
        enum: ['admin', 'author', 'user'],
        default:"user"
            },
            email:{
                type:String,
                trim:true,
                lowecase:true,
                required:true,
                unique:true,
                validate(value){
                    if(!validator.isEmail(value)) 
                        throw new Error("invalid email format")
                }
            },
              password:{
                type:String,
                trim:true,
                required:true
            },
            tokens:[
                {
                    token:{
                        type:String,
                    }
                }
            ] , 
            image:{
                type:String,
                trim:true,
                lowecase:true
            },
            posts: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Posts'
            }],
        

        }
        ,
        {
            timestamps:true
        })
//userSchema.index({ otp: 1 }, { expireAfterSeconds: 600 });

userSchema.pre("save", async function(){
    const userData = this
    if(userData.isModified("password"))
        userData.password = await bcryptjs.hash(userData.password, 10)
})

userSchema.methods.GeneraterTokens = async function(){
    const UserData = this
    const token = jwt.sign({_id : UserData._id} , "123")
    UserData.tokens = UserData.tokens.concat({token})
await UserData.save()
return token
}
userSchema.statics.LoginUser = async function(email , password){
    const userData = await User.findOne({ email})
    console.log(email, password)
    if(!userData) throw new Error("No such userSchema")
    const checkpass = await bcryptjs.compare(password  ,userData.password)
    if(!checkpass) throw new Error("Invalid password")
    return userData
}

const User = mongoose.model("Users", userSchema , "Users")
module.exports = User
