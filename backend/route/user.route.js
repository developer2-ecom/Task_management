const express=require('express');
const userRouter=express.Router()

userRouter.post('/registration',async()=>{
const {userName,email,Password}=req.body;
  try {
    bcrypt.hash(Password, 10, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.status(500).send({"msg":'something is wrong'})
        }else{
            const RegisterUser=new userModel({userName,email,Password:hash})
            RegisterUser.save()
          res.status(200).send({'message':'You are login!', user:RegisterUser})
        }

    })
  } catch (error) {
    res.status(400).send({'message':'user is not register!'})
  }

})

userRouter.get('/login',async()=>{

})

module.exports={userRouter}