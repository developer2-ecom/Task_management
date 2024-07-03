require("dotenv").config();
const express=require('express')
const APP=express()
const cors=require('cors')
APP.use(cors())
const { connection } = require('mongoose');
const { userRouter } = require("./route/user.route");

APP.use=(express.json())
APP.use(userRouter)


APP.listen(process.env.port,async()=>{
    try {
      await connection
        console.log(`running on port ${process.env.port}`)
    } catch (error) {
        console.log('Something wrong')
    }
})

