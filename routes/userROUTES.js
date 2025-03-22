import express  from "express"
import {checkUser, signup, userLogin, userlogout, userProfile,userProfileUpdate } from "../controllers/userC.js"
import   {authuser} from "../middlewares/authUsers.js"
import { authuadmin } from "../middlewares/authAdmins.js"
const router = express.Router()


router.post("/signup",signup)
router.post("/login",userLogin)

router.get("/profile",authuser,userProfile)
router.put("/update",authuser,userProfileUpdate)

router.put("/deactivate",authuadmin)
router.get("/logout",userlogout)

router.delete("/detele-account")

router.get('/checkuser',authuser,checkUser)
router.put("/deactivate-user/:userid",authuadmin)


export default router

