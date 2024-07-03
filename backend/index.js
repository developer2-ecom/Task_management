// require("dotenv").config();
const express=require("express")
const { connection } = require('./db');
const APP=express()
// const cors=require("cors")
const { userRouter } = require("./route/user.route");
const { taskRoute } = require("./route/task.route");
const { auth } = require("./middleware/auth");

// APP.use(cors())
APP.use(express.json())
APP.use(userRouter)
APP.use(taskRoute)

// const port

APP.listen(process.env.port,async()=>{
    try {
      await connection
      
        console.log(`running on port ${process.env.port}`)
    } catch (error) {
        console.log('Something wrong')
    }
})


