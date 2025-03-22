import express from "express"
import { getorders } from "../controllers/orderC.js"

const router = express.Router()


router.post("/order")

router.get("/order",getorders)

router.get("/order/:id")





router.put("/order/:id")


router.delete("/order/:id")

export default router