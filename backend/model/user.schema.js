const mongoose= require('mongoose')
const  UserSchema=mongoose.connect({
    userName:String,
    email:String,
    Password:String,

})

const userModel=mongoose.model("user",UserSchema)
module.exports={userModel}