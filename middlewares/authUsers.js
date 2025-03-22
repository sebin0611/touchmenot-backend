import jwt from "jsonwebtoken"



export const authuser =(req, res, next)=>{
    try {

       
        const {token}=req.cookies
        
      
        if(!token){
            return res.status(401).json({message:"user not authorized"})
        }

       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);


       if(!decodedToken){
        return res.status(401).json({message:"user not authorized"})
       }
       req.user=decodedToken

        next()

    }
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
}

   