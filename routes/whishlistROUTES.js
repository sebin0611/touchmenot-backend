import express  from "express"
import { authuser } from "../middlewares/authUsers.js"
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/whishlistC.js"
const router = express.Router()

router.post("/:productId",authuser,addToWishlist)


router.get("/",authuser,getWishlist)


router.delete("/wishlist/:id",authuser,removeFromWishlist)

export default router