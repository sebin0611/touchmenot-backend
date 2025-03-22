import jwt from "jsonwebtoken"



export  const authuadmin =(req, res, next)=>{
    try {

       
        const {token}=req.cookies
        
      
        if(!token){
            return res.status(401).json({message:"user not authorized"})
        }

       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);


       if(!decodedToken){
        return res.status(401).json({message:"user not authorized"})
       }

       if (decodedToken.role!="admin"){
        return res.status(401).json({message:"user not authorized"})
       }

       req.admin=decodedToken

        next()

    }
    catch(error){
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
    }
    
        