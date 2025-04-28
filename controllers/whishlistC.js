import { authuser } from '../middlewares/authUsers.js';
import Wishlist from '../models/whishlistMODEL.js';

export const addToWishlist = async (req, res) => {
    try {
      
      authuser(req, res, async () => {
        const { productId } = req.params;
        const userId = req.user.id; 
  
       
        let wishlist = await Wishlist.findOne({ user: userId });
  
        if (!wishlist) {
          wishlist = new Wishlist({
            user: userId,
            products: [],
          });
        }
  
        const productExists = wishlist.products.some(
          (item) => item.productId.toString() === productId
        );
  
        if (productExists) {
          return res.status(400).json({ message: 'Product already in wishlist' });
        }
  
    
        wishlist.products.push({ productId });
  
      
        await wishlist.save();
  
        res.status(200).json({ message: 'Product added to wishlist', wishlist });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };




export const removeFromWishlist = async (req, res) => {
    try {

            const { productId } = req.body;
            const userId = req.user.id;


            const wishlist = await Wishlist.findOne({ user: userId });

            if (!wishlist) {
                return res.status(404).json({ message: 'Wishlist not found' });
            }


            const productIndex = wishlist.products.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (productIndex === -1) {
                return res.status(404).json({ message: 'Product not found in wishlist' });
            }

            wishlist.products.splice(productIndex, 1);

            await wishlist.save();

            res.status(200).json({ message: 'Product removed from wishlist', wishlist });
        }
     catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getWishlist = async (req, res) => {
    try {

        
            const userId = req.user.id;


            const wishlist = await Wishlist.findOne({ user: userId }).populate({
                path: 'products.productId',
                select: 'name price images',
            });


            if (!wishlist) {
                return res.status(200).json({ message: 'Wishlist is empty', wishlist: { products: [] } });
            }


            res.status(200).json({ message: 'Wishlist retrieved successfully', wishlist });
        }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};