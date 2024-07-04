const jwt=require('jsonwebtoken');
const { blacklist } = require('./blacklist');
const auth=(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1]

if(token){
  if(blacklist.includes(token)){
  res.status(401).json({message:'please login again'})
    }
    jwt.verify(token, process.env.secreatKey, (err, decoded)=> {
        if(decoded){
          req.user=decoded
          next()
        }else{
        return  res.status(403).send(err)
        }
        });
      
}else{
  res.status(401).json({ error: 'You are not logged in' });
}

}

module.exports={auth}