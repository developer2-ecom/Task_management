const jwt=require('jsonwebtoken');
const { blacklist } = require('./blacklist');
const auth=(req,res,next)=>{
  // req.headers.authorization?.split(" ")[1]
let token=req.headers.cookie
      // console.log(token)
      // console.log(req.headers.cookie)
      if(req.headers.cookie)
        req.headers.cookie.split(";").map((s) => {
          token = s.startsWith("access_token")
            ? s.substring("access_token=".length)
            : "";
        });

        console.log("token1",token)
if(token){
  if(blacklist.includes(token)){
  res.status(401).json({message:'please login again'})
    }
    jwt.verify(token, process.env.secreatKey, (err, decoded)=> {
      console.log(token)
        if(decoded){
          req.user=decoded
      console.log(token)

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