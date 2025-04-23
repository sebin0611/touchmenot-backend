import express  from "express"
import { authuser } from "../middlewares/authUsers.js"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/whishlistC.js"
const router = express.Router()

router.post("/wishlist",authuser,addToWishlist)


router.get("/wishlist/:id",authuser,getWishlist)


router.delete("/wishlist/:id",authuser,removeFromWishlist)

export default router