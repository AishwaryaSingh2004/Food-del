/*import mongoose from "mongoose";

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    category:{
        type:String,
        enum:[ "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ],
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    foodType:{
        type:String,
        enum:["veg","non veg"],
        required:true
    }

},{timestamps:true})

const Item=mongoose.model("Item", itemSchema)
export default Item;
*/


/*
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    // ✅ FIX 1: make image optional
    image: {
        type: String,
        default: ""
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },

    category: {
        type: String,
        enum: [
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ],
        required: true
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    // ✅ FIX 2: match frontend values
    foodType: {
        type: String,
        enum: ["Veg", "Non-Veg"], // 👈 FIXED
        default: "Veg"
    },
    rating: {
        average:{type:Number,default:0},
        count:{type:Number,default:0},
    }

}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;*/


/*
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },

    // ✅ ADD THIS (IMPORTANT FIX)
    city: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ],
        required: true
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    foodType: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        default: "Veg"
    },

    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }

}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;*/


import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        default: "https://dummyimage.com/300x200/cccccc/000000&text=Food",
        trim: true
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        enum: [
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ],
        required: true
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    foodType: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        default: "Veg"
    },

    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }

}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);
export default Item;