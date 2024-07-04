const mongoose= require('mongoose')
const  UserSchema=mongoose.Schema({
    userName:String,
    email:String,
    Password:String,
},{
    versionKey:false
})

const userModel=mongoose.model("user",UserSchema)
module.exports={userModel}