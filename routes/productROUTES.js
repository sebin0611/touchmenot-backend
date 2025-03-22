import express from "express"
import{authuser} from "../middlewares/authUsers.js"
import  {authuadmin}  from "../middlewares/authAdmins.js"
import {  createProduct, getallproduct, getoneproduct}  from "../controllers/productC.js"
import { upload } from "../middlewares/multer.js"

const router = express.Router()

router.get("/products",getallproduct)

router.get("/product/:productID",getoneproduct)

router.post("/products",upload.single('images'),createProduct)



router.put("/product/:id",authuadmin)


router.delete("/product/:id",authuadmin)

export default router