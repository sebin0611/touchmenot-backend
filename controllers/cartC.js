import Cart from "../models/cartMODEL.js";
import Product from "../models/productMODEL.js";
import { authuser } from "../middlewares/authUsers.js";




export const addToCart = async (req, res) => {
    try {
      
      authuser(req, res, async () => {
        const {quantity } = req.body;
        const userId = req.user.id; 
        const productId= req.params.id
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        let cart = await Cart.findOne({ user: userId });
  
        if (!cart) {
          cart = new Cart({
            user: userId,
            products: [],
            totalPrice: 0,
          });
        }
  
        const productIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );
  
        if (productIndex > -1) {
         
          cart.products[productIndex].quantity += quantity;
        } else {
         
          cart.products.push({
            productId,
            quantity,
            price: product.price,
          });
        }
  
        
        cart.totalPrice = cart.products.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
  
        
        await cart.save();
  
        res.status(200).json({ message: 'Product added to cart', cart });
      });
    } 
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
  };



  export const getCart = async (req, res) => {
    try {


      authuser(req, res, async () => {
        const userId = req.user.id; 
  
        
        const cart = await Cart.findOne({ user: userId }).populate({
          path: 'products.productId',
          select: 'name price images', 
        });
  
        if (!cart) {
          return res.status(200).json({ message: 'Cart is empty', cart: { products: [], totalPrice: 0 } });
        }
  
        res.status(200).json({ message: 'Cart retrieved successfully', cart });
      });
    } 

    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
  };

  export const removeFromCart = async (req, res) => {

    try {


      authuser(req, res, async () => {
        const { productId } = req.body; 
        const userId = req.user.id; 
  
        const cart = await Cart.findOne({ user: userId });
  
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
  
       
        const productIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId
        );
  
        if (productIndex === -1) {
          return res.status(404).json({ message: 'Product not found in cart' });
        }
  
        cart.products.splice(productIndex, 1);
  
        
        cart.totalPrice = cart.products.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
  
        await cart.save();
  
        res.status(200).json({ message: 'Product removed from cart', cart });
      });
    }



catch(error){
    console.log("not signed in")
    res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
    console.log(error)
}
  }
