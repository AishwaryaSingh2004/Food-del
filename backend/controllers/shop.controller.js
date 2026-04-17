import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createEditShop=async (req,res) => {
    try {
        const {name,city,state,address}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        let shop=await Shop.findOne({owner:req.userId})
            if(!shop){
                 shop=await Shop.create({
            name,city,state,address,image,owner:req.userId
        })
        }else{
             shop=await Shop.findByIdAndUpdate(shop._id,{
            name,city,state,address,image,owner:req.userId
        },{new:true})
        }

        await shop.populate("owner items")
        return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({message:`create shop error ${error}`})
    }
}

export const getMyShop=async (req,res) => {
    try {
        const shop=await Shop.findOne({owner:req.userId}).populate("owner").populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            });
        if(!shop){
            return null
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({message:`get my shop error ${error}`})
    }    
}

export const getShopByCity=async (req,res) => {
    try {
        const {city}=req.params

        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`, "i")}
        }).populate('items')
        if(!shops){
            return res.status(400).json({message:"shops not found"})
        }
        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({message:`get shop by city error ${error}`})
    }
}















/*export const editShop=async (req,res) => {
    try {
        const {name,city,state,address}=req.body
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path)
        }
        const shop=await Shop.create({
            name,city,state,address,image,owner:req.userId
        })
    } catch (error) {
        
    }
}


/*
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

// ================= CREATE / EDIT SHOP =================
export const createEditShop = async (req, res) => {
    try {
        const { name, city, state, address } = req.body;
        let image;

        if (req.file) {
            image = await uploadOnCloudinary(req.file.path);
        }

        // ✅ SAFETY CHECK
        if (!req.userId || !mongoose.Types.ObjectId.isValid(req.userId)) {
            return res.status(401).json({
                message: "Invalid userId"
            });
        }

        let shop = await Shop.findOne({ owner: req.userId });

        if (!shop) {
            shop = await Shop.create({
                name,
                city,
                state,
                address,
                image,
                owner: req.userId
            });
        } else {
            shop = await Shop.findByIdAndUpdate(
                shop._id,
                { name, city, state, address, image, owner: req.userId },
                { new: true }
            );
        }

        await shop.populate("owner items");

        return res.status(201).json(shop);

    } catch (error) {
        console.log("❌ CREATE SHOP ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};



// ================= GET MY SHOP =================
export const getMyShop = async (req, res) => {
    try {
        console.log("🔥 getMyShop HIT");
        console.log("USER ID:", req.userId);

        // ✅ CRITICAL FIX (prevents crash)
        if (!req.userId || !mongoose.Types.ObjectId.isValid(req.userId)) {
            return res.status(401).json({
                message: "Invalid or missing userId"
            });
        }

        const shop = await Shop.findOne({ owner: req.userId })
            .populate("owner")
            .populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        return res.status(200).json(shop);

    } catch (error) {
        console.log("❌ GET MY SHOP ERROR:", error); // 👈 YOU WILL SEE REAL ERROR NOW

        return res.status(500).json({
            message: error.message
        });
    }
};



// ================= GET SHOP BY CITY =================
export const getShopByCity = async (req, res) => {
    try {
        const { city } = req.params;

        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate("items");

        if (!shops || shops.length === 0) {
            return res.status(404).json({
                message: "shops not found"
            });
        }

        return res.status(200).json(shops);

    } catch (error) {
        console.log("❌ GET SHOP BY CITY ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};*/

