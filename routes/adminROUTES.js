import express from "express"
import { adminLogin, checkadmin } from "../controllers/adminC.js"
import { authuadmin } from "../middlewares/authAdmins.js"
import { adminProfile } from "../controllers/adminC.js"
import { adminProfileUpdate } from "../controllers/adminC.js"
import { adminLogout } from "../controllers/adminC.js"
import { signup } from "../controllers/adminC.js"


const router = express.Router()


router.post("/signup",signup)

router.post("/login",adminLogin)

router.get("/profile",authuadmin,adminProfile)

router.put("/update",authuadmin,adminProfileUpdate)

router.put("/deactivate",authuadmin)

router.get("/logout",authuadmin,adminLogout)

router.delete('/delete-account')

router.put('/deactivateUser/:userId',authuadmin)

router.get("/checkadmin",authuadmin,checkadmin)


export default router
