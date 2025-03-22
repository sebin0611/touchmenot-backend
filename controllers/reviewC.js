import Review from "../models/reviewMODEL.js";
import Product from "../models/productMODEL.js";


export const addReview = async (req, res) => {



    try {
        const { productId, rating, comment } = req.body;

        if (!rating || !comment) 
            {
            return res.status(400).json({ message: "Rating and comment are required" });
        }

     
        const product = await Product.findById(productId);
        if (!product) 
            {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = await Review.create({
            userId: req.user.id, 
            productId,
            rating,
            comment
        });

        res.status(201).json({ message: "Review added successfully", review });
    } 
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
};


export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId })
            .populate("userId", "name");  

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this product" });
        }

        res.json({ reviews });
    } 
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
};


export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) return res.status(404).json({ message: "Review not found" });

        

        await review.deleteOne();
        res.json({ message: "Review deleted successfully" });
    } 
    catch(error){
        console.log("not signed in")
        res.status(error.statuscode || 500).json({message:error.message||"internal sever error"})
        console.log(error)
    }
};