/*import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { addItem, editItem, getItemById } from "../controllers/item.controllers.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { upload } from "../middlewares/multer.js"



const itemRouter=express.Router()


itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)
itemRouter.get("/get-by-id/:itemId",isAuth,getItemById)


export default itemRouter*/


import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  addItem,
  deleteItem,
  editItem,
  getItemByCity,
  getItemById
} from "../controllers/item.controllers.js";
import { upload } from "../middlewares/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);

itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

itemRouter.get("/get-by-id/:itemId", isAuth, getItemById);

itemRouter.delete("/delete/:itemId", isAuth, deleteItem);

// ✅ FIXED: removed isAuth
itemRouter.get("/get-by-city/:city", getItemByCity);

export default itemRouter;