import Product from "../models/productMODEL.js";
import review from "../models/reviewMODEL.js";
import { cloudinaryInstance } from "../config/cloudinary.js"




export const getallproduct = async(req,res,next)=>{
    try{
        const productlist = await Product.find();

        res.json({data:productlist,message:"user authorised"});

    }
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        
    }
}

export const getoneproduct = async(req,res,next)=>{
    try{
        
        const {productId}=req.params
        const displaySingleProduct= await Product.findById(productId)
        const productReview= await review.findById(productId)

        res.json({data:{displaySingleProduct,productReview}, message:"user authorized"})

    }
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        
    }

}
export const createProduct = async (req, res, next)=>{

    try {
        console.log(req.body)
        const {name , description, price, category, stock}=req.body
        
    

       console.log(req.file," requested file is present")

       const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
       console.log(cloudinaryRes.url)

        const newProduct = new Product({name , description, price, category, stock, images: cloudinaryRes.url})
        newProduct.save()

        res.json({data:newProduct, message:"user authorized"})

    
    }

    
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        
    }
}
