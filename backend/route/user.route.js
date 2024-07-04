const express=require('express');
const bcrypt=require("bcrypt")
const {userModel}=require('../model/user.schema');
const jwt = require('jsonwebtoken');
const { blacklist } = require('../middleware/blacklist');
const userRouter=express.Router()

userRouter.post('/registration',async(req,res)=>{
    const {userName,email,Password}=req.body;
    console.log(userName,"name")
    console.log(email,"name")
    console.log(Password,"name")
      try {
        bcrypt.hash(Password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(500).send({"msg":'something is wrong'})
            }else{
                const RegisterUser=new userModel({userName,email,Password:hash})
               await RegisterUser.save()
              res.status(200).send({status:true, 'message':'You are login!', user:RegisterUser})
            }
    
        })
      } catch (error) {
        res.status(400).send({error:'user is not register!'})
      }
    
    })
    
    userRouter.post('/login',async(req,res)=>{
      const {email,Password}=req.body;
      try {
        const user= await userModel.findOne({email});
        if(user){
          bcrypt.compare(Password,user.Password,(error,result)=>{
            if(result){
              const token=jwt.sign({userId:user._id},process.env.secreatKey)
              console
             res.status(200).json({"message":"you are Login !",token:token,user:user})
            }else{
              res.status(400).json({message: 'invalid Credintial'})
            }

          })
        }else{
          res.status(400).json({message: 'invalid Credintial'})
        }

        
      } catch (error) {
        console.log(error)
        
      }

    })

    userRouter.get('/logout',async(req,res)=>{
      const token=req.headers.authorization?.split(" ")[1]
      try {
        if(token){
          blacklist.push(token)
          res.status(200).json({message:"you are logOut!"})
        }
      } catch (error) {

        res.status(400).json({message:error})
      }

    })
    
    module.exports={userRouter}