/*import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    shopOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    broadcastedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        }
    ],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    status:{
        type:String,
        enum:["broadcasted","assigned","completed"],
        default:"broadcasted"
    },
    acceptedAt:Date
    
}, { timestamps: true })

const DeliveryAssignment=mongoose.model("DeliveryAssignment", deliveryAssignmentSchema)
export default DeliveryAssignment*/

/*
import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    shopOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order", // ✅ added ref for consistency
        required: true
    },
    broadcastedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            // ❌ removed required:true (not needed inside array)
        }
    ],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["broadcasted", "assigned", "completed"],
        default: "broadcasted"
    },
    acceptedAt: {
        type: Date
    }

}, { timestamps: true });

const DeliveryAssignment = mongoose.model("DeliveryAssignment", deliveryAssignmentSchema);

export default DeliveryAssignment;*/

import mongoose from "mongoose";

const deliveryAssignmentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },

    // ✅ FIXED: removed wrong ref
    shopOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    broadcastedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    status: {
        type: String,
        enum: ["broadcasted", "assigned", "completed"],
        default: "broadcasted"
    },

    acceptedAt: {
        type: Date,
        default: null // ✅ small improvement
    }

}, { timestamps: true });

const DeliveryAssignment = mongoose.model("DeliveryAssignment", deliveryAssignmentSchema);

export default DeliveryAssignment;