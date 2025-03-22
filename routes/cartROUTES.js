import express from "express"
import { addToCart,getCart,removeFromCart } from "../controllers/cartC.js"
import { authuser } from "../middlewares/authUsers.js"



const router = express.Router()


router.post('/addtocart/:id',authuser,addToCart)
router.get('/get-cart',authuser,getCart)
router.delete('/removeitem',authuser,removeFromCart)


export default router