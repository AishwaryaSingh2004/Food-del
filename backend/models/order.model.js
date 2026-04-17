


/*
import mongoose from "mongoose";

// ✅ ITEM LEVEL
const shopOrderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    name: String,       // snapshot
    price: Number,
    quantity: Number,
    image: String
  },
  { timestamps: true }
);

// ✅ SHOP LEVEL
const shopOrderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    subTotal: {
      type: Number,
      required: true
    },
    shopOrderItems: [shopOrderItemSchema],
    status:{
      type:String,
      enum:["pending","preparing","out for delivery","delivered"],
      default:"pending"
    }
  },
  { timestamps: true }
);

// ✅ MAIN ORDER
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true
    },

    deliveryAddress: {
      text: {
        type: String,
        required: true
      },
      latitude: Number,
      longitude: Number
    },

    totalAmount: {
      type: Number,
      required: true
    },

    // ✅ USE shopOrderSchema (FIXED)
    shopOrders: [shopOrderSchema]
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;*/


import mongoose from "mongoose";

// ✅ ITEM LEVEL
const shopOrderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    name: String,
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    image: String
  },
  { timestamps: true }
);

// ✅ SHOP LEVEL
const shopOrderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    shopOrderItems: [shopOrderItemSchema],
    status: {
      type: String,
      enum: ["pending", "preparing", "out for delivery", "delivered"],
      default: "pending"
    },
    assignment:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryAssignment",
      default:null
    },
    assignedDeliveryBoy:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryOtp:{
        type:String,
        default:null
    },
   
    otpExpires:{
        type:Date,
        default:null
    },
    deliveredAt:{
      type:Date,
      default:null
    }
  },
  { timestamps: true }
);

// ✅ MAIN ORDER
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true
    },

    deliveryAddress: {
      text: {
        type: String,
        required: true
      },
      latitude: Number,
      longitude: Number
    },

    totalAmount: {
      type: Number,
      required: true
    },

    shopOrders: [shopOrderSchema],
    payment:{
      type:Boolean,
      default:false
    },
    razorpayOrderId:{
      type:String,
      default:""
    },
    razorpayPaymentId:{
      type:String,
      default:""
    }
  },{ timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;