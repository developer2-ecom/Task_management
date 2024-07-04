require("dotenv").config();
const express=require("express")
const { connection } = require('./db');
const APP=express()
const { userRouter } = require("./route/user.route");
const { taskRoute } = require("./route/task.route");
const { auth } = require("./middleware/auth");
const cors=require("cors")

APP.use(cors({ credentials: true, origin: "http://localhost:3000" }))
APP.use(cors())

APP.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000"  );
    next();
})


APP.use(express.json())
APP.use(userRouter)
APP.use(auth,taskRoute)

// const port

APP.listen(process.env.port,async()=>{
    try {
      await connection
      
        console.log(`running on port ${process.env.port}`)
    } catch (error) {
        console.log('Something wrong')
    }
})


