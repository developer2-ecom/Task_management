const mongoose=require('mongoose')
require('dotenv').config()
const connection=mongoose.connect("mongodb+srv://alishaiqecom:Alisha@cluster0.gitrjep.mongodb.net/userTask")

module.exports={connection}

