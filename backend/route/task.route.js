const express=require('express');
const { Task } = require('../model/task.schema');
const taskRoute=express.Router();

taskRoute.post('/loginUserTask',async(req,res)=>{
    const {title, description,status}=req.body;
    try {
        const loginUserTask= new Task({title,description,status})
        await loginUserTask.save()
        res.status(200).json({message:'Task is Created!',loginUserTask:loginUserTask})
    } catch (error) {
        res.status(200).json({message:error})
    }


})


taskRoute.get('/taskDisplay',async(req,res)=>{

    try {
       const  loginUserTask= await Task.find()
       res.status(200).json({task: loginUserTask})
    } catch (error) {
        res.status(401).json({error:error})
        
    }


})


taskRoute.patch('/taskUpdate/:id',async(req,res)=>{

    const{id}=req.params;
    const updatedtask=req.body;
    try {
        const updated= await Task.findByIdAndUpdate({_id:id},updatedtask,{new:true})
        console.log(updated)
     if(!updated){
        res.status(404).json({message:"Try to updte again!"})
     }
     res.status(200).json({message:'post is Updated', updated:updated})
    } catch (error) {
        res.status(400).json({message:error})
    }

})


taskRoute.delete('/taskDelete/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const deletePost= await Task.findByIdAndDelete(id)
        console.log(deletePost,"de3lete")
        if(!deletePost){
        res.status(404).json({message:"Try to Delete it again!"}) 
        }
        res.status(200).json({message:'post is Deleted now!', deletePost:deletePost})
    } catch (error) {
        res.status(400).json({message:error})
    }
})

module.exports={taskRoute}
