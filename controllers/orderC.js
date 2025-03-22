import Order from "../models/orderMODEL.js";




export const getorders = async(req,res,next)=>{
    try{
        const userid =req.user.id
        const orderlist = await Order.findOne({userid}).populate('product.product')

        res.json({data:orderlist,message:"user authorised"});

    }
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        
    }
}