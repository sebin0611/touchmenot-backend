
import user from "../models/userMODEL.js"
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const signup = async(req,res,next)=>{
    try{
        //res.json({data:data,message:"signup success"})
        console.log("signup is working")

        const{username,email,password,address,confirmpassword,profilepic}=req.body

        if(!username||!email||!password||!confirmpassword){
            return res.status(400).json({message:"all fields required"})
            
        }
        console.log(username,email,password)

        const userExist= await user.findOne({email})
        if(userExist){
            return res.status(400).json({message:"user already exist"})
        }

        const hashpassword = bcrypt.hashSync(password,10);
        const newuser = new user({username,email,password:hashpassword,address,profilepic})
        await newuser.save()

        const token = generateToken(newuser._id,'user')
        res.cookie("token", token,{
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });
        res.json({data: newuser,message:'signup success'})

    }
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
}


export const userLogin =async (req,res, next)=>{
    try{
       //collect user data
       const {email,password}=req.body




       //data validation
       if(!email || !password){
        return res.status(400).json({message:"all fields required"})
       }

       //user exist -check
       const userExist= await user.findOne({email})

       if(!userExist){
        return res.status(404).json({message:"user not found"})
       }



       // check db password is matched
       const passwordMatch=bcrypt.compareSync(password, userExist.password)

       if(!passwordMatch){
        return res.status(401).json({message:"invalid credentials"})
       }


       //generate token 
       const token = generateToken(userExist._id,"user")
       res.cookie("token", token,{
        sameSite: NODE_ENV === "production" ? "None" : "Lax",
        secure: NODE_ENV === "production",
        httpOnly: NODE_ENV === "production",
    });
       const { password: _, ...userWithoutPassword } = userExist.toObject();

        res.json({ data: userWithoutPassword, message: 'Login successful' });


    }
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        
    }
}

    export const userProfile =async (req, res, next)=>{
    
        try{
        

            const userId=req.user.id
    
            const userData= await user.findById(userId)
            res.json({data:userData,message:"user profile fetched"})
        }
        catch(error){
            console.log("not signed in")
            res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
            
        }
      
    }
   
    export const userProfileUpdate= async (req,res,next)=>{
        try {
            const {username,email,password,confirmPassword,address,profilePic} =req.body
    
            const userId=req.user.id
            const userupdateData= await user.findByIdAndUpdate(userId,{username,email,password,confirmPassword,address,profilePic},{new:true})
    
            res.json({data:userupdateData,message:"user profile updated"})
    
    
        } 
        catch(error){
            console.log("not signed in")
            res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
            
        }
      
    }

      

    export const userlogout = async (req,res,next)=>{
        try{
            res.clearCookie('token')
            res.json({message:"user successfully logged out"})
        }




    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        
    }

  
}
export const checkUser= async( req,res,next)=>{

    try {
        res.json({message:"user is authorized"})
    }
        catch(error){
            console.log("not signed in")
            res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
            
        }
    
    }
