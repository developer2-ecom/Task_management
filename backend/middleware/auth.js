const jwt=require('jsonwebtoken');
const { blacklist } = require('./blacklist');
const auth=(req,res,next)=>{
const token=req.headers.authorization?.split('')

if(token){
  if(blacklist.includes(token)){
  res.status({'message':'please login again'})
    }
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if(decoded){
          next()
        }else{
          res.sent(err)
        }
        });
      
}else{
    res.send({err:'you are not login'})
}

}

module.exports={auth}