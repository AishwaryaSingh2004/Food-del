/*import express from "express"
import { getCurrentuser } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"


const userRouter=express.Router()


userRouter.get("/current",isAuth,getCurrentuser)


export default userRouter*/

/*
import express from "express"
import { getCurrentuser, getShopByCity, updateuserLocation } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentuser)

// ✅ ADD THIS ROUTE
userRouter.get("/get-by-city/:city", getShopByCity)
userRouter.post('/update-location',updateuserLocation)

export default userRouter*/


import express from "express"
import { getCurrentuser, getShopByCity, updateuserLocation } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"

const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrentuser)

userRouter.get("/get-by-city/:city", getShopByCity)

// ✅ FIXED
userRouter.post('/update-location', isAuth, updateuserLocation)

export default userRouter