import express from "express"
import userRoutes from "./userROUTES.js"
import wishlistRoutes from "./whishlistROUTES.js"
import reviewRoutes from "./reviewROUTES.js"
import productRoutes from "./productROUTES.js"
import orderRoutes from "./orderROUTES.js"
import adminRoutes from "./adminROUTES.js"
import cartRoutes from "./cartROUTES.js"
import bannerRoutes from "./bannerROUTES.js"
import paymentsROUTES from "./paymentsROUTES.js"


const router = express.Router()

router.use('/user',userRoutes)
router.use('/wishlist',wishlistRoutes)
router.use('/user',reviewRoutes)
router.use('/product',productRoutes)
router.use('/user',orderRoutes)
router.use('/admin',adminRoutes)
router.use('/cart',cartRoutes)
router.use('/order',orderRoutes)
router.use('/admin',bannerRoutes)
router.use('/payment',paymentsROUTES)


export default router