require("dotenv").config();
const express=require('express')
const APP=express()
const cors=require('cors')
APP.use(cors())
const { connection } = require('mongoose')

APP.use=(express.json())


APP.listen(process.env.PORT,async()=>{
    try {
      await connection
        console.log(`running on port ${process.env.PORT}`)
    } catch (error) {
        console.log('Something wrong')
    }
})
// App.use()

