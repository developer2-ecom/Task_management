const express=require('express')
const taskRoute=express.Router();

taskRoute.post('/task/post',()=>{

})


taskRoute.get('/task/data',()=>{

})


taskRoute.patch('/taskUpdate/:id',()=>{

})


taskRoute.patch('/taskDelete/:id',()=>{

})

module.exports={taskRoute}

