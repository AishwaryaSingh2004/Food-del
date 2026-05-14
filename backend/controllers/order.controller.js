

/*
import Shop from "../models/shop.model.js";
import orderModel from "../models/order.model.js";
import User from "../models/user.model.js";
import DeliveryAssignment from "../models/deliveryAssignment.model.js";
import mongoose from "mongoose";
import { sendDeliveryOtpMail } from "../utils/mail.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ================= PLACE ORDER =================
export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" });
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            deliveryAddress.latitude === undefined ||
            deliveryAddress.longitude === undefined
        ) {
            return res.status(400).json({ message: "send complete deliveryAddress" });
        }

        const groupItemsByShop = {};

        cartItems.forEach((item) => {
            const shopId = typeof item.shop === "object" ? item.shop._id : item.shop;
            if (!groupItemsByShop[shopId]) groupItemsByShop[shopId] = [];
            groupItemsByShop[shopId].push(item);
        });

        const shopOrders = await Promise.all(
            Object.keys(groupItemsByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner");
                if (!shop) throw new Error("shop not found");

                const items = groupItemsByShop[shopId];
                const subTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    subTotal,
                    shopOrderItems: items.map((i) => ({
                        item: i._id,
                        price: i.price,
                        quantity: i.quantity,
                        name: i.name,
                    })),
                };
            })
        );

        const totalAmount = shopOrders.reduce((sum, s) => sum + s.subTotal, 0);

        if (paymentMethod === "online") {
            const razorOrder = await instance.orders.create({
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                receipt: `receipt_${Date.now()}`,
            });

            const newOrder = await orderModel.create({
                user: req.userId,
                paymentMethod,
                deliveryAddress,
                totalAmount,
                shopOrders,
                razorpayOrderId: razorOrder.id,
                payment: false,
            });

            return res.status(200).json({
                razorOrder,
                orderId: newOrder._id,
            });
        }

        const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
        });

        return res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });

    } catch (error) {
        console.log("ORDER ERROR:", error);
        return res.status(500).json({ message: `place order error: ${error.message}` });
    }
};

// ================= VERIFY PAYMENT =================
export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) return res.status(400).json({ message: "Order not found" });

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        order.payment = true;
        order.razorpayPaymentId = razorpay_payment_id;
        await order.save();

        await order.populate("shopOrders.shopOrderItems.item", "name image price");
        await order.populate("shopOrders.shop", "name");

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({ message: `verify payment error: ${error.message}` });
    }
};

// ================= GET MY ORDERS =================
export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === "user") {
            const orders = await orderModel
                .find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "fullName email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price");

            return res.status(200).json(orders);
        }

        if (user.role === "owner") {
            const orders = await orderModel
                .find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user", "fullName email")
                .populate("shopOrders.shopOrderItems.item", "name image price");

            const filteredOrders = orders.map((order) => ({
                _id: order._id,
                paymentMethod: order.paymentMethod,
                user: order.user,
                createdAt: order.createdAt,
                totalAmount: order.totalAmount,
                deliveryAddress: order.deliveryAddress,
                payment: order.payment,
                shopOrders: order.shopOrders.filter(
                    (o) => o.owner.toString() === req.userId
                ),
            }));

            return res.status(200).json(filteredOrders);
        }

        return res.status(403).json({ message: "Invalid role" });

    } catch (error) {
        return res.status(500).json({ message: `get user order error: ${error.message}` });
    }
};

// ================= UPDATE ORDER STATUS =================
export const updateorderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        const shopOrder = order.shopOrders.find(
            (o) =>
                o.shop?.toString() === shopId ||
                o.shop?._id?.toString() === shopId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" });
        }

        shopOrder.status = status;
        let deliveryBoyPayload = [];

        if (status === "out for delivery") {
            const { longitude, latitude } = order.deliveryAddress;

            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(longitude), Number(latitude)],
                        },
                        $maxDistance: 5000,
                    },
                },
            });

            const nearByIds = nearByDeliveryBoys.map((b) => b._id);

            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: "assigned",
            }).distinct("assignedTo");

            const busySet = new Set(busyIds.map(String));
            const availableBoys = nearByDeliveryBoys.filter((b) => !busySet.has(String(b._id)));
            const candidates = availableBoys.map((b) => b._id);

            if (candidates.length === 0) {
                await order.save();
                return res.json({ message: "No delivery boys available" });
            }

            if (shopOrder.assignment) {
                await DeliveryAssignment.findByIdAndDelete(shopOrder.assignment);
            }

            const assignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop._id || shopOrder.shop,
                shopOrderId: shopOrder._id,
                broadcastedTo: candidates,
                assignedTo: null,
                status: "broadcasted",
            });

            shopOrder.assignment = assignment._id;

            deliveryBoyPayload = availableBoys.map((b) => ({
                id: b._id,
                fullName: b.fullName,
                longitude: b.location.coordinates?.[0],
                latitude: b.location.coordinates?.[1],
                mobile: b.mobile,
            }));
        }

        await order.save();

        await order.populate("shopOrders.shop", "name");
        await order.populate("shopOrders.shopOrderItems.item", "name image price");
        await order.populate("shopOrders.assignedDeliveryBoy", "fullName mobile");

        const updatedShopOrder = order.shopOrders.find(
            (o) => o.shop?._id?.toString() === shopId || o.shop?.toString() === shopId
        );

        if (!updatedShopOrder) {
            return res.status(400).json({ message: "Updated shop order not found" });
        }

        return res.status(200).json({
            shopOrder: updatedShopOrder,
            availableBoys: deliveryBoyPayload,
            assignment: updatedShopOrder.assignment,
        });

    } catch (error) {
        return res.status(500).json({ message: `order status error: ${error.message}` });
    }
};

// ================= GET DELIVERY BOY ASSIGNMENTS =================
export const getDeliveryBoyAssignment = async (req, res) => {
    try {
        const deliveryBoy = await User.findById(req.userId);

        if (!deliveryBoy?.location?.coordinates) {
            return res.status(400).json({ message: "Delivery boy location not found" });
        }

        const [lng, lat] = deliveryBoy.location.coordinates;

        // ✅ FIX: Only fetch orders with at least one "out for delivery" shopOrder
        const orders = await orderModel
            .find({ "shopOrders.status": "out for delivery" })
            .populate("shopOrders.shop", "name")
            .populate("user", "fullName email mobile location");

        let result = [];

        for (let order of orders) {
            if (!order.deliveryAddress) continue;

            const orderLng = Number(order.deliveryAddress.longitude);
            const orderLat = Number(order.deliveryAddress.latitude);

            const distance =
                Math.sqrt(Math.pow(lat - orderLat, 2) + Math.pow(lng - orderLng, 2)) * 111000;

            if (distance <= 50000) {
                for (let so of order.shopOrders) {
                    if (
                        so.status?.toLowerCase() === "out for delivery" &&
                        !so.assignedDeliveryBoy &&
                        so.assignment
                    ) {
                        // ✅ FIX: Verify this delivery boy is in the broadcastedTo list
                        const assignment = await DeliveryAssignment.findById(so.assignment);
                        if (!assignment) continue;
                        if (assignment.status !== "broadcasted") continue;

                        const isBroadcasted = assignment.broadcastedTo
                            .map(String)
                            .includes(String(req.userId));
                        if (!isBroadcasted) continue;

                        result.push({
                            assignmentId: so.assignment,  // ✅ This is the DeliveryAssignment _id
                            orderId: order._id,
                            shopName: so.shop?.name || "Shop",
                            deliveryAddress: order.deliveryAddress,
                            shopOrder: so,
                            user: order.user,
                            deliveryBoyLocation: { lat, lon: lng },
                            customerLocation: {
                                lat: order.deliveryAddress.latitude,
                                lon: order.deliveryAddress.longitude,
                            },
                        });
                    }
                }
            }
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ================= ACCEPT ORDER =================
export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        const assignment = await DeliveryAssignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        if (assignment.assignedTo) {
            return res.status(400).json({ message: "Order already accepted" });
        }

        // ✅ Check if delivery boy is in broadcastedTo list
        const isBroadcasted = assignment.broadcastedTo.map(String).includes(String(req.userId));
        if (!isBroadcasted) {
            return res.status(403).json({ message: "You are not assigned to this order" });
        }

        const active = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned",
        });

        if (active) {
            return res.status(400).json({ message: "You already have an active order" });
        }

        // ✅ Assign
        assignment.assignedTo = req.userId;
        assignment.status = "assigned";
        await assignment.save();

        // ✅ Update shopOrder
        const order = await orderModel.findById(assignment.order);
        const shopOrder = order.shopOrders.id(assignment.shopOrderId);

        shopOrder.assignedDeliveryBoy = req.userId;
        await order.save();

        return res.status(200).json({ message: "Order accepted successfully" });

    } catch (error) {
        return res.status(500).json({ message: `accept error: ${error.message}` });
    }
};

// ================= GET CURRENT ORDER =================
export const getCurrentOrder = async (req, res) => {
    try {
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned",
        })
            .populate("shop", "name")
            .populate("assignedTo", "fullName email mobile location")
            .populate({
                path: "order",
                populate: [{ path: "user", select: "fullName email mobile location" }],
            });

        if (!assignment || !assignment.order) {
            return res.status(200).json(null);
        }

        const shopOrder = assignment.order.shopOrders.find(
            (so) =>
                so._id.toString() === assignment.shopOrderId.toString() &&
                so.status !== "delivered"
        );

        if (!shopOrder) {
            return res.status(200).json(null);
        }

        let deliveryBoyLocation = { lat: null, lon: null };
        if (assignment.assignedTo?.location?.coordinates?.length === 2) {
            deliveryBoyLocation.lat = assignment.assignedTo.location.coordinates[1];
            deliveryBoyLocation.lon = assignment.assignedTo.location.coordinates[0];
        }

        let customerLocation = { lat: null, lon: null };
        if (assignment.order.deliveryAddress) {
            customerLocation.lat = assignment.order.deliveryAddress.latitude;
            customerLocation.lon = assignment.order.deliveryAddress.longitude;
        }

        return res.status(200).json({
            _id: assignment.order._id,
            user: assignment.order.user,
            shopOrder,
            deliveryAddress: assignment.order.deliveryAddress,
            deliveryBoyLocation,
            customerLocation,
            shop: assignment.shop,
        });

    } catch (error) {
        return res.status(500).json({ message: `current order error: ${error.message}` });
    }
};

// ================= GET ORDER BY ID =================
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order id" });
        }

        const order = await orderModel
            .findById(orderId)
            .populate("user", "fullName email mobile location")
            .populate({
                path: "shopOrders",
                populate: [
                    { path: "shop", select: "name" },
                    { path: "assignedDeliveryBoy", select: "fullName email mobile location" },
                    { path: "shopOrderItems.item", select: "name price image" },
                ],
            })
            .lean();

        if (!order) return res.status(404).json({ message: "order not found" });

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ================= SEND DELIVERY OTP =================
export const sendDeliveryOtp = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId).populate("user");
        if (!order) return res.status(400).json({ message: "Invalid orderId" });

        // ✅ FIX: find the shopOrder assigned to THIS delivery boy
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned",
            order: orderId,
        });

        if (!assignment) {
            return res.status(400).json({ message: "No active assignment found" });
        }

        const shopOrderIndex = order.shopOrders.findIndex(
            (s) => s._id.toString() === assignment.shopOrderId.toString()
        );

        if (shopOrderIndex === -1) {
            return res.status(400).json({ message: "Shop order not found" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        order.shopOrders[shopOrderIndex].deliveryOtp = otp;
        order.shopOrders[shopOrderIndex].otpExpires = Date.now() + 5 * 60 * 1000;

        await order.save();

        await sendDeliveryOtpMail(order.user.email, otp);

        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ================= VERIFY DELIVERY OTP =================
export const verifyDeliveryOtp = async (req, res) => {
    try {
        const { orderId, shopOrderId, otp } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) return res.status(400).json({ message: "Order not found" });

        const shopOrder = order.shopOrders.id(shopOrderId);
        if (!shopOrder) return res.status(400).json({ message: "Shop order not found" });

        if (!shopOrder.deliveryOtp || shopOrder.deliveryOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (shopOrder.otpExpires && shopOrder.otpExpires < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        shopOrder.status = "delivered";
        shopOrder.deliveredAt = new Date();
        shopOrder.deliveryOtp = null;
        shopOrder.otpExpires = null;

        const assignment = await DeliveryAssignment.findById(shopOrder.assignment);
        if (assignment) {
            assignment.status = "completed";
            await assignment.save();
        }

        await order.save();

        return res.status(200).json({ message: "Order delivered successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};*/


/*
 const filteredOrders = orders.map((order) => ({
     _id: order._id,
     paymentMethod: order.paymentMethod,
     user: order.user,
     createdAt: order.createdAt,
     totalAmount: order.totalAmount,
     deliveryAddress: order.deliveryAddress,

     // ✅ KEEP ARRAY (IMPORTANT)
     shopOrders: order.shopOrders.filter(
         (o) => o.owner.toString() === req.userId
     ),
 }));

 return res.status(200).json(filteredOrders);
}

return res.status(403).json({ message: "Invalid role" });

} catch (error) {
return res.status(500).json({
 message: `get user order error: ${error.message}`,
});
}
};

/*
export const updateorderStatus=async (req,res) => {
try {
const {orderId,shopId}=req.params
const {status}=req.body
const order=await Order.findById(orderId)

const shopOrder= order.shopOrders.find(o=>o.shop==shopId)
if(!shopOrder){
 return res.status(400).json({message:"shop order not found"})
}
shopOrder.status=status
await shopOrder.save()
await shopOrder.populate("shopOrderItems.item","name image price")
return res.status(200).json(shopOrder)
} catch (error) {
return res.status(500).json({
message: ` order status error: ${error.message}`,
})
}
}*/








/*
export const updateorderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        const shopOrder = order.shopOrders.find(
            (o) => o.shop.toString() === shopId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" });
        }

        shopOrder.status = status;
        let deliveryBoyPayload = []
        if (status == "out for delivery" || !shopOrder.assignment) {
            const { longitude, latitude } = order.deliveryAddress
            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: [Number(longitude), Number(latitude)] },
                        $maxDistance: 5000
                    }
                }
            })

            const nearByIds = nearByDeliveryBoys.map(b => b._id)
            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: { $min: ["broadcasted", "completed"] }

            }).distinct("assignedTo")

            const busyIdSet = new Set(busyIds.map(id => String(id)))

            const availableBoys = nearByDeliveryBoys.filter(b => !busyIdSet.has(String(b._id)))
            const candidates = availableBoys.map(b => b._id)

            if (candidates.length == 0) {
                await order.save()
                return res.json({
                    message: "order status updated but there is no available delivery boys"
                })
            }


            const deliveryAssignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop,
                shopOrderId: shopOrder._id,
                broadcastedTo: candidates,
                status: "broadcasted"
            })

            shopOrder.assignedDeliveryBoy=deliveryAssignment.assignedTo
            shopOrder.assignment = deliveryAssignment._id
            deliveryBoyPayload = availableBoys.map(b => ({
                id: b._id,
                fullName: b.fullName,
                longitude: b.location.coordinates?.[0],
                latitude: b.location.coordinates?.[1],
                mobile: b.mobile
            }))
        }


        // ✅ save parent
        await order.save();

        //await shopOrder.populate("shopOrderItems.item", "name image price");

        await order.populate("shopOrders.shopOrderItems.item", "name image price")
        await order.populate("shopOrders.assignedDeliveryBoy","fullName email mobile")

        const updatedShopOrder= order.shopOrders.find(o=>o.shop==shopId)

        return res.status(200).json({
            shopOrder: updatedShopOrder,
            assignedDeliveryBoy: updatedShopOrder.assignedDeliveryBoy,
            availableBoys: deliveryBoysPayload,
            assignment:updatedShopOrder.assignment._id
        });

    } catch (error) {
        return res.status(500).json({
            message: `order status error: ${error.message}`,
        });
    }
};*/



/*
import Shop from "../models/shop.model.js";
import orderModel from "../models/order.model.js";
import User from "../models/user.model.js";
import DeliveryAssignment from "../models/deliveryAssignment.model.js";

// ================= PLACE ORDER ================= 
export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" });
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            deliveryAddress.latitude === undefined ||
            deliveryAddress.longitude === undefined
        ) {
            return res.status(400).json({
                message: "send complete deliveryAddress",
            });
        }

        const groupItemsByShop = {};

        cartItems.forEach((item) => {
            if (!item.shop) throw new Error("Item missing shopId");

            if (!groupItemsByShop[item.shop]) {
                groupItemsByShop[item.shop] = [];
            }

            groupItemsByShop[item.shop].push(item);
        });

        const shopOrders = await Promise.all(
            Object.keys(groupItemsByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner");
                if (!shop) throw new Error("shop not found");

                const items = groupItemsByShop[shopId];

                const subTotal = items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    subTotal,
                    shopOrderItems: items.map((i) => ({
                        item: i._id,
                        price: i.price,
                        quantity: i.quantity,
                        name: i.name,
                    })),
                };
            })
        );

        const totalAmount = shopOrders.reduce(
            (sum, s) => sum + s.subTotal,
            0
        );

        const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
        });

        const populatedOrder = await orderModel
            .findById(newOrder._id)
            .populate("shopOrders.shop", "name")
            .populate("shopOrders.owner", "fullName email mobile")
            .populate("shopOrders.shopOrderItems.item", "name image price");

        return res.status(201).json({
            message: "Order placed successfully",
            order: populatedOrder,
        });

    } catch (error) {
        console.log("ORDER ERROR:", error);
        return res.status(500).json({
            message: `place order error: ${error.message}`,
        });
    }
};


// ================= GET MY ORDERS ================= 
export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === "user") {
            const orders = await orderModel
                .find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "fullName email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price");

            return res.status(200).json(orders);
        }

        if (user.role === "owner") {
            const orders = await orderModel
                .find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user", "fullName email")
                .populate("shopOrders.shopOrderItems.item", "name image price");

            const filteredOrders = orders.map((order) => ({
                _id: order._id,
                paymentMethod: order.paymentMethod,
                user: order.user,
                createdAt: order.createdAt,
                totalAmount: order.totalAmount,
                deliveryAddress: order.deliveryAddress,
                shopOrders: order.shopOrders.filter(
                    (o) => o.owner.toString() === req.userId
                ),
            }));

            return res.status(200).json(filteredOrders);
        }

        return res.status(403).json({ message: "Invalid role" });

    } catch (error) {
        return res.status(500).json({
            message: `get user order error: ${error.message}`,
        });
    }
};


// ================= UPDATE ORDER STATUS ================= 
export const updateorderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        const shopOrder = order.shopOrders.find(
            (o) => o.shop.toString() === shopId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" });
        }

        shopOrder.status = status;

        let deliveryBoyPayload = [];

        if (status === "out for delivery" || !shopOrder.assignment) {
            const { longitude, latitude } = order.deliveryAddress;

            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                //role: "delivery",
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(longitude), Number(latitude)],
                        },
                        $maxDistance: 5000,
                    },
                },
            });

            const nearByIds = nearByDeliveryBoys.map((b) => b._id);

            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: { $in: ["assigned"] }, // ✅ FIX
            }).distinct("assignedTo");

            const busySet = new Set(busyIds.map(String));

            const availableBoys = nearByDeliveryBoys.filter(
                (b) => !busySet.has(String(b._id))
            );

            const candidates = availableBoys.map((b) => b._id);

            if (candidates.length === 0) {
                await order.save();
                return res.json({
                    message: "No delivery boys available",
                });
            }

            const assignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop,
                shopOrderId: shopOrder._id,
                broadcastedTo: candidates,
                status: "broadcasted",
            });

            shopOrder.assignment = assignment._id;

            deliveryBoyPayload = availableBoys.map((b) => ({
                id: b._id,
                fullName: b.fullName,
                longitude: b.location.coordinates?.[0],
                latitude: b.location.coordinates?.[1],
                mobile: b.mobile,
            }));
        }

        await order.save();
    
        await order.populate("shopOrders.shop", "name");
        await order.populate("shopOrders.shopOrderItems.item");
        await order.populate("shopOrders.assignedDeliveryBoy");

        const updatedShopOrder = order.shopOrders.find(
            (o) => o.shop.toString() === shopId
        );

        return res.status(200).json({
            shopOrder: updatedShopOrder,
            availableBoys: deliveryBoyPayload, // ✅ FIXED NAME
            assignment: updatedShopOrder.assignment,
        });

    } catch (error) {
        return res.status(500).json({
            message: `order status error: ${error.message}`,
        });
    }
};
*/


import Shop from "../models/shop.model.js";
import orderModel from "../models/order.model.js";
import User from "../models/user.model.js";
import DeliveryAssignment from "../models/deliveryAssignment.model.js";
import mongoose from "mongoose";
import { sendDeliveryOtpMail } from "../utils/mail.js";
import Razorpay from "razorpay";
import dotenv from "dotenv"
dotenv.config()
// ================= PLACE ORDER ================= 
/*
export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" });
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            deliveryAddress.latitude === undefined ||
            deliveryAddress.longitude === undefined
        ) {
            return res.status(400).json({
                message: "send complete deliveryAddress",
            });
        }

        const groupItemsByShop = {};

        cartItems.forEach((item) => {
            if (!item.shop) throw new Error("Item missing shopId");

            if (!groupItemsByShop[item.shop]) {
                groupItemsByShop[item.shop] = [];
            }

            groupItemsByShop[item.shop].push(item);
        });

        const shopOrders = await Promise.all(
            Object.keys(groupItemsByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner");
                if (!shop) throw new Error("shop not found");

                const items = groupItemsByShop[shopId];

                const subTotal = items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    subTotal,
                    shopOrderItems: items.map((i) => ({
                        item: i._id,
                        price: i.price,
                        quantity: i.quantity,
                        name: i.name,
                    })),
                };
            })
        );

        const totalAmount = shopOrders.reduce(
            (sum, s) => sum + s.subTotal,
            0
        );

        const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
        });

        const populatedOrder = await orderModel
            .findById(newOrder._id)
            .populate("shopOrders.shop", "name")
            .populate("shopOrders.owner", "fullName email mobile")
            .populate("shopOrders.shopOrderItems.item", "name image price");

        return res.status(201).json({
            message: "Order placed successfully",
            order: populatedOrder,
        });

    } catch (error) {
        console.log("ORDER ERROR:", error);
        return res.status(500).json({
            message: `place order error: ${error.message}`,
        });
    }
};*/

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/*
export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" });
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            deliveryAddress.latitude === undefined ||
            deliveryAddress.longitude === undefined
        ) {
            return res.status(400).json({
                message: "send complete deliveryAddress",
            });
        }

        const groupItemsByShop = {};

        cartItems.forEach((item) => {
            if (!item.shop) throw new Error("Item missing shopId");

            // ✅ FIX: handle object OR string
            const shopId =
                typeof item.shop === "object"
                    ? item.shop._id
                    : item.shop;

            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = [];
            }

            groupItemsByShop[shopId].push(item);
        });

        const shopOrders = await Promise.all(
            Object.keys(groupItemsByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner");
                if (!shop) throw new Error("shop not found");

                const items = groupItemsByShop[shopId];

                const subTotal = items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    subTotal,
                    shopOrderItems: items.map((i) => ({
                        item: i._id,
                        price: i.price,
                        quantity: i.quantity,
                        name: i.name,
                    })),
                };
            })
        );

        const totalAmount = shopOrders.reduce(
            (sum, s) => sum + s.subTotal,
            0
        );

        if(paymentMethod=="online"){
            const razorOrder=instance.orders.create({
                amount:Math.round(totalAmount*100),
                currency:'INR',
                receipt:`receipt_${Date.now()}`
            })
            const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
            razorpayOrderId: (await razorOrder).id,
            payment:false
        });

        return res.status(200).json({
            razorOrder,
            orderId:newOrder._id,
            key_id:process.env.RAZORPAY_KEY_ID,
        })
}

        const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
        });

        const populatedOrder = await orderModel
            .findById(newOrder._id)
            .populate("shopOrders.shop", "name")
            .populate("shopOrders.owner", "fullName email mobile")
            .populate("shopOrders.shopOrderItems.item", "name image price");

        return res.status(201).json({
            message: "Order placed successfully",
            order: populatedOrder,
        });

    } catch (error) {
        console.log("ORDER ERROR:", error);
        return res.status(500).json({
            message: `place order error: ${error.message}`,
        });
    }
};

export const verifyPayment=async (req,res) => {
    try {
        const {razorpay_payment_id,orderId}=req.body
        const payment=await instance.payments.fetch(razorpay_payment_id)
        if(!payment || payment.status!="captured"){
            return res.status(400).json({message:"order not found"})
        }

        order.payment=true
        order.razorpayPaymentId=razorpay_payment_id
        await order.save()

        await order.populate("shopOrders.shopOrderItems.item", "name image price")
        await order.populate("shopOrders.shop", "name")
        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({message: `verify payment | error ${error}`})
    }
}*/


/*
export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" });
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            deliveryAddress.latitude === undefined ||
            deliveryAddress.longitude === undefined
        ) {
            return res.status(400).json({
                message: "send complete deliveryAddress",
            });
        }

        const groupItemsByShop = {};

        cartItems.forEach((item) => {
            const shopId =
                typeof item.shop === "object"
                    ? item.shop._id
                    : item.shop;

            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = [];
            }

            groupItemsByShop[shopId].push(item);
        });

        const shopOrders = await Promise.all(
            Object.keys(groupItemsByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner");
                if (!shop) throw new Error("shop not found");

                const items = groupItemsByShop[shopId];

                const subTotal = items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    subTotal,
                    shopOrderItems: items.map((i) => ({
                        item: i._id,
                        price: i.price,
                        quantity: i.quantity,
                        name: i.name,
                    })),
                };
            })
        );

        const totalAmount = shopOrders.reduce(
            (sum, s) => sum + s.subTotal,
            0
        );

        // ✅ ONLINE PAYMENT
        if (paymentMethod === "online") {

            const razorOrder = await instance.orders.create({
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            });

            const newOrder = await orderModel.create({
                user: req.userId,
                paymentMethod,
                deliveryAddress,
                totalAmount,
                shopOrders,
                razorpayOrderId: razorOrder.id,
                payment: false
            });

            return res.status(200).json({
                razorOrder,
                orderId: newOrder._id,
                //key_id: process.env.RAZORPAY_KEY_ID,
            });
        }

        // ✅ COD
        const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
        });

        await newOrder.populate("user","name email mobile")
        const io=req.app.get('io')

        if(io){
            newOrder.shopOrders.forEach(shopOrder => {
                const ownerSocketId=shopOrder.owner.socketId
                if(ownerSocketId){
                    io.to(ownerSocketId).emit('newOrder',{
                _id: newOrder._id,
                paymentMethod: newOrder.paymentMethod,
                user: newOrder.user,
                createdAt: newOrder.createdAt,
                totalAmount: newOrder.totalAmount,
                deliveryAddress: newOrder.deliveryAddress,
                payment:newOrder.payment,
                shopOrders: newOrdershopOrders.filter(
                    (o) => o.owner.toString() === req.userId
                ),
                })
                }
            })
        }




        return res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });

    } catch (error) {
        console.log("ORDER ERROR:", error);
        return res.status(500).json({
            message: `place order error: ${error.message}`,
        });
    }
};
*/


export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "cart is empty" });
        }

        if (
            !deliveryAddress ||
            !deliveryAddress.text ||
            deliveryAddress.latitude === undefined ||
            deliveryAddress.longitude === undefined
        ) {
            return res.status(400).json({
                message: "send complete deliveryAddress",
            });
        }

        // ✅ GROUP ITEMS BY SHOP
        const groupItemsByShop = {};

        cartItems.forEach((item) => {
            const shopId =
                typeof item.shop === "object"
                    ? item.shop._id
                    : item.shop;

            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = [];
            }

            groupItemsByShop[shopId].push(item);
        });

        // ✅ CREATE SHOP ORDERS
        const shopOrders = await Promise.all(
            Object.keys(groupItemsByShop).map(async (shopId) => {
                const shop = await Shop.findById(shopId).populate("owner");
                if (!shop) throw new Error("shop not found");

                const items = groupItemsByShop[shopId];

                const subTotal = items.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                );

                return {
                    shop: shop._id,
                    owner: shop.owner._id,
                    subTotal,
                    shopOrderItems: items.map((i) => ({
                        item: i._id,
                        price: i.price,
                        quantity: i.quantity,
                        name: i.name,
                    })),
                };
            })
        );

        const totalAmount = shopOrders.reduce(
            (sum, s) => sum + s.subTotal,
            0
        );

        // =========================
        // ✅ ONLINE PAYMENT
        // =========================
        if (paymentMethod === "online") {

            const razorOrder = await instance.orders.create({
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            });

            const newOrder = await orderModel.create({
                user: req.userId,
                paymentMethod,
                deliveryAddress,
                totalAmount,
                shopOrders,
                razorpayOrderId: razorOrder.id,
                payment: false
            });

            return res.status(200).json({
                razorOrder,
                orderId: newOrder._id,
            });
        }

        // =========================
        // ✅ COD ORDER
        // =========================
        const newOrder = await orderModel.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders,
            payment: false
        });

        // ✅ populate user
        await newOrder.populate("user", "fullName email mobile");

        const io = req.app.get("io");

        // =========================
        // ✅ SOCKET EMIT TO OWNERS
        // =========================
        if (io) {
            for (const shopOrder of newOrder.shopOrders) {

                // 👉 fetch owner to get socketId
                const owner = await User.findById(shopOrder.owner);

                if (owner?.socketId) {
                    io.to(owner.socketId).emit("newOrder", {
                        _id: newOrder._id,
                        paymentMethod: newOrder.paymentMethod,
                        user: newOrder.user,
                        createdAt: newOrder.createdAt,
                        totalAmount: newOrder.totalAmount,
                        deliveryAddress: newOrder.deliveryAddress,
                        payment: newOrder.payment,
                        shopOrders: [shopOrder] // ✅ send only that shopOrder
                    });
                }
            }
        }

        return res.status(201).json({
            message: "Order placed successfully",
            order: newOrder,
        });

    } catch (error) {
        console.log("ORDER ERROR:", error);
        return res.status(500).json({
            message: `place order error: ${error.message}`,
        });
    }
};


import crypto from "crypto";

/*
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        // ✅ SIGNATURE VERIFY
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment verification failed"
            });
        }

        // ✅ UPDATE ORDER
        order.payment = true;
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save();

        await order.populate("shopOrders.shopOrderItems.item", "name image price");
        await order.populate("shopOrders.shop", "name");
        await newOrder.populate("user", "fullName email mobile");

        const io = req.app.get("io");

        // =========================
        // ✅ SOCKET EMIT TO OWNERS
        // =========================
        if (io) {
            for (const shopOrder of newOrder.shopOrders) {

                // 👉 fetch owner to get socketId
                const owner = await User.findById(shopOrder.owner);

                if (owner?.socketId) {
                    io.to(owner.socketId).emit("newOrder", {
                        _id: newOrder._id,
                        paymentMethod: newOrder.paymentMethod,
                        user: newOrder.user,
                        createdAt: newOrder.createdAt,
                        totalAmount: newOrder.totalAmount,
                        deliveryAddress: newOrder.deliveryAddress,
                        payment: newOrder.payment,
                        shopOrders: [shopOrder] // ✅ send only that shopOrder
                    });
                }
            }
        }

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({
            message: `verify payment error: ${error.message}`
        });
    }
};
*/


export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        // ✅ SIGNATURE VERIFY
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment verification failed"
            });
        }

        // ✅ UPDATE ORDER
        order.payment = true;
        order.razorpayPaymentId = razorpay_payment_id;

        await order.save();

        // ✅ CORRECT populate (use order, not newOrder)
        await order.populate("shopOrders.shopOrderItems.item", "name image price");
        await order.populate("shopOrders.shop", "name");
        await order.populate("user", "fullName email mobile");

        const io = req.app.get("io");

        // =========================
        // ✅ SOCKET EMIT TO OWNERS
        // =========================
        if (io) {
            for (const shopOrder of order.shopOrders) {

                const owner = await User.findById(shopOrder.owner);

                if (owner?.socketId) {
                    io.to(owner.socketId).emit("newOrder", {
                        _id: order._id,
                        paymentMethod: order.paymentMethod,
                        user: order.user,
                        createdAt: order.createdAt,
                        totalAmount: order.totalAmount,
                        deliveryAddress: order.deliveryAddress,
                        payment: order.payment,
                        shopOrders: [shopOrder]
                    });
                }
            }
        }

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({
            message: `verify payment error: ${error.message}`
        });
    }
};




// ================= GET MY ORDERS ================= 
export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        /*if (user.role === "user") {
             const orders = await orderModel
                 .find({ user: req.userId })
                 .sort({ createdAt: -1 })
                 .populate("shopOrders.shop", "name")
                 .populate("shopOrders.owner", "fullName email mobile")
                 .populate("shopOrders.shopOrderItems.item", "name image price")
                 */

        if (user.role === "user") {
            const orders = await orderModel
                .find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "fullName email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                .populate("shopOrders.assignedDeliveryBoy", "fullName mobile");


            return res.status(200).json(orders);
        }

        /*if (user.role === "owner") {
            const orders = await orderModel
                .find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user", "fullName email")
                .populate("shopOrders.shopOrderItems.item", "name image price");*/

        if (user.role === "owner") {
            const orders = await orderModel
                .find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user", "fullName email")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                .populate("shopOrders.assignedDeliveryBoy", "fullName mobile");

            const filteredOrders = orders.map((order) => ({
                _id: order._id,
                paymentMethod: order.paymentMethod,
                user: order.user,
                createdAt: order.createdAt,
                totalAmount: order.totalAmount,
                deliveryAddress: order.deliveryAddress,
                payment: order.payment,
                shopOrders: order.shopOrders.filter(
                    (o) => o.owner.toString() === req.userId
                ),
            }));

            return res.status(200).json(filteredOrders);
        }

        return res.status(403).json({ message: "Invalid role" });

    } catch (error) {
        return res.status(500).json({
            message: `get user order error: ${error.message}`,
        });
    }
};

/*
export const getMyOrders = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ================= USER =================
        if (user.role === "user") {
            const orders = await orderModel
                .find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("shopOrders.owner", "fullName email mobile")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                .populate("shopOrders.assignedDeliveryBoy", "fullName mobile"); // ✅ FIX

            return res.status(200).json(orders);
        }

        // ================= OWNER =================
        if (user.role === "owner") {
            const orders = await orderModel
                .find({ "shopOrders.owner": req.userId })
                .sort({ createdAt: -1 })
                .populate("shopOrders.shop", "name")
                .populate("user", "fullName email")
                .populate("shopOrders.shopOrderItems.item", "name image price")
                .populate("shopOrders.assignedDeliveryBoy", "fullName mobile"); // ✅ FIX

            const filteredOrders = orders.map((order) => ({
                _id: order._id,
                paymentMethod: order.paymentMethod,
                user: order.user,
                createdAt: order.createdAt,
                totalAmount: order.totalAmount,
                deliveryAddress: order.deliveryAddress,
                shopOrders: order.shopOrders.filter(
                    (o) => o.owner.toString() === req.userId
                ),
            }));

            return res.status(200).json(filteredOrders);
        }

        return res.status(403).json({ message: "Invalid role" });

    } catch (error) {
        return res.status(500).json({
            message: `get user order error: ${error.message}`,
        });
    }
};
*/



/*
export const updateorderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrders.find(
            (o) =>
                o.shop?.toString() === shopId ||
                o.shop?._id?.toString() === shopId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" });
        }

        const normalizedStatus = status.toLowerCase();
        shopOrder.status = normalizedStatus;

        let availableBoys = []; // ✅ FIX: define outside

        // =========================
        // ✅ DELIVERY ASSIGNMENT
        // =========================
        if (normalizedStatus === "out for delivery") {

            const { longitude, latitude } = order.deliveryAddress;

            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(longitude), Number(latitude)],
                        },
                        $maxDistance: 5000,
                    },
                },
            });

            const nearByIds = nearByDeliveryBoys.map((b) => b._id);

            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: "assigned",
            }).distinct("assignedTo");

            const busySet = new Set(busyIds.map(String));

            availableBoys = nearByDeliveryBoys.filter(
                (b) => !busySet.has(String(b._id))
            );

            const candidates = availableBoys.map((b) => b._id);

            if (candidates.length === 0) {
                await order.save();
                return res.json({
                    message: "No delivery boys available",
                });
            }

            if (shopOrder.assignment) {
                await DeliveryAssignment.findByIdAndDelete(shopOrder.assignment);
            }

            const assignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop._id || shopOrder.shop,
                shopOrderId: shopOrder._id,
                broadcastedTo: candidates,
                assignedTo: null,
                status: "broadcasted",
            });

            shopOrder.assignment = assignment._id;

            // =========================
            // ✅ SOCKET TO DELIVERY BOYS
            // =========================
            const io = req.app.get("io");

            if (io) {
                for (const boy of availableBoys) {
                    if (boy.socketId) {
                        io.to(boy.socketId).emit("newAssignment", {
                            orderId: DeliveryAssignment.order._id,
                            shopOrderId: shopOrder._id,
                            shopId: shopOrder.shop._id || shopOrder.shop,
                            totalAmount: order.totalAmount,
                            deliveryAddress: order.deliveryAddress
                        });
                    }
                }
            }
        }

        await order.save();

        // ✅ populate user socket
        await order.populate("user", "socketId");

        const io = req.app.get("io");

        // =========================
        // ✅ SOCKET TO USER
        // =========================
        if (io) {
            const userSocketId = order.user.socketId;

            if (userSocketId) {
                io.to(userSocketId).emit("update-status", {
                    orderId: order._id,
                    shopId: shopOrder.shop._id || shopOrder.shop,
                    status: shopOrder.status,
                    userId: order.user._id
                });
            }
        }

        return res.status(200).json({
            shopOrder,
            assignment: shopOrder.assignment,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};*/





/*
export const updateorderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrders.find(
            (o) =>
                o.shop?.toString() === shopId ||
                o.shop?._id?.toString() === shopId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" });
        }

        const normalizedStatus = status.toLowerCase();
        shopOrder.status = normalizedStatus;

        let availableBoys = [];

        const io = req.app.get("io"); // ✅ single declaration

        // =========================
        // ✅ DELIVERY ASSIGNMENT
        // =========================
        if (normalizedStatus === "out for delivery") {

            if (!order.deliveryAddress) {
                return res.status(400).json({
                    message: "Delivery address missing"
                });
            }

            const { longitude, latitude } = order.deliveryAddress;

            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(longitude), Number(latitude)],
                        },
                        $maxDistance: 5000,
                    },
                },
            });

            const nearByIds = nearByDeliveryBoys.map((b) => b._id);

            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: "assigned",
            }).distinct("assignedTo");

            const busySet = new Set(busyIds.map(String));

            availableBoys = nearByDeliveryBoys.filter(
                (b) => !busySet.has(String(b._id))
            );

            const candidates = availableBoys.map((b) => b._id);

            if (candidates.length === 0) {
                await order.save();
                return res.json({
                    message: "No delivery boys available",
                });
            }

            if (shopOrder.assignment) {
                await DeliveryAssignment.findByIdAndDelete(shopOrder.assignment);
            }

            const assignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop._id || shopOrder.shop,
                shopOrderId: shopOrder._id,
                broadcastedTo: candidates,
                assignedTo: null,
                status: "broadcasted",
            });

            shopOrder.assignment = assignment._id;

            // =========================
            // ✅ SOCKET TO DELIVERY BOYS
            // =========================
            if (io) {
                for (const boy of availableBoys) {
                    if (boy.socketId) {
                        io.to(boy.socketId).emit("newAssignment", {
                            orderId: order._id,
                            shopOrderId: shopOrder._id,
                            shopId: shopOrder.shop._id || shopOrder.shop,
                            totalAmount: order.totalAmount,
                            deliveryAddress: order.deliveryAddress
                        });
                    }
                }
            }
        }

        await order.save();

        // ✅ populate user socket
        await order.populate("user", "socketId");

        // =========================
        // ✅ SOCKET TO USER
        // =========================
        if (io) {
            const userSocketId = order.user.socketId;

            if (userSocketId) {
                io.to(userSocketId).emit("update-status", {
                    orderId: order._id,
                    shopId: shopOrder.shop._id || shopOrder.shop,
                    status: shopOrder.status,
                    userId: order.user._id
                });
            }
        }

       
        return res.status(200).json({
    shopOrder,
    assignment: shopOrder.assignment,
    availableBoys: availableBoys.map((b) => ({
        id: b._id,
        fullName: b.fullName,
        mobile: b.mobile,
        latitude: b.location?.coordinates?.[1],
        longitude: b.location?.coordinates?.[0],
    })),
});

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};*/



export const updateorderStatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrders.find(
            (o) =>
                o.shop?.toString() === shopId ||
                o.shop?._id?.toString() === shopId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "shop order not found" });
        }

        const normalizedStatus = status.toLowerCase();
        shopOrder.status = normalizedStatus;

        let availableBoys = [];

        const io = req.app.get("io");

        // =========================
        // ✅ DELIVERY ASSIGNMENT
        // =========================
        if (normalizedStatus === "out for delivery") {

            if (!order.deliveryAddress) {
                return res.status(400).json({
                    message: "Delivery address missing"
                });
            }

            const { longitude, latitude } = order.deliveryAddress;

            // 🔥 FIX: fallback if no nearby boys found
            let nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(longitude), Number(latitude)],
                        },
                        $maxDistance: 5000,
                    },
                },
            });

            if (!nearByDeliveryBoys.length) {
                nearByDeliveryBoys = await User.find({ role: "deliveryBoy" });
            }

            const nearByIds = nearByDeliveryBoys.map((b) => b._id);

            const busyIds = await DeliveryAssignment.find({
                assignedTo: { $in: nearByIds },
                status: "assigned",
            }).distinct("assignedTo");

            const busySet = new Set(busyIds.map(String));

            availableBoys = nearByDeliveryBoys.filter(
                (b) => !busySet.has(String(b._id))
            );

            const candidates = availableBoys.map((b) => b._id);

            if (candidates.length === 0) {
                await order.save();
                return res.json({
                    message: "No delivery boys available",
                });
            }

            if (shopOrder.assignment) {
                await DeliveryAssignment.findByIdAndDelete(shopOrder.assignment);
            }

            const assignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopOrder.shop._id || shopOrder.shop,
                shopOrderId: shopOrder._id,
                broadcastedTo: candidates,
                assignedTo: null,
                status: "broadcasted",
            });

            shopOrder.assignment = assignment._id;

            if (io) {
                for (const boy of availableBoys) {
                    if (boy.socketId) {
                        io.to(boy.socketId).emit("newAssignment", {
                            orderId: order._id,
                            shopOrderId: shopOrder._id,
                            shopId: shopOrder.shop._id || shopOrder.shop,
                            totalAmount: order.totalAmount,
                            deliveryAddress: order.deliveryAddress
                        });
                    }
                }
            }
        }

        await order.save();

        await order.populate("user", "socketId");

        if (io) {
            const userSocketId = order.user.socketId;

            if (userSocketId) {
                io.to(userSocketId).emit("update-status", {
                    orderId: order._id,
                    shopId: shopOrder.shop._id || shopOrder.shop,
                    status: shopOrder.status,
                    userId: order.user._id
                });
            }
        }

        return res.status(200).json({
            shopOrder,
            assignment: shopOrder.assignment,
            availableBoys: availableBoys.map((b) => ({
                id: b._id,
                fullName: b.fullName,
                mobile: b.mobile,
                latitude: b.location?.coordinates?.[1],
                longitude: b.location?.coordinates?.[0],
            })),
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};





/*
export const getDeliveryBoyAssignment = async (req, res) => {
    try {
        const deliveryBoyId = req.userId;

        const deliveryBoy = await User.findById(deliveryBoyId);

        if (!deliveryBoy?.location?.coordinates) {
            return res.status(400).json({
                message: "Delivery boy location not found"
            });
        }

        const [lng, lat] = deliveryBoy.location.coordinates;

        const orders = await orderModel.find({
            "shopOrders.status": "out for delivery"
        }).populate("shopOrders.shop", "name");

        let result = [];

        for (let order of orders) {
            const orderLng = Number(order.deliveryAddress.longitude);
            const orderLat = Number(order.deliveryAddress.latitude);

            const distance =
                Math.sqrt(
                    Math.pow(lat - orderLat, 2) +
                    Math.pow(lng - orderLng, 2)
                ) * 111000;

            if (distance <= 5000) {
                for (let so of order.shopOrders) {
                    if (
                        so.status === "out for delivery" &&
                        !so.assignedDeliveryBoy
                    ) {
                        result.push({
                            assignmentId: so._id, // ✅ KEEP THIS (shopOrderId)
                            orderId: order._id,
                            shopName: so.shop?.name,
                            deliveryAddress: order.deliveryAddress,
                            items: so.shopOrderItems || [],
                            subtotal: so.subTotal || 0
                        });
                    }
                }
            }
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            message: `get assignment error: ${error.message}`
        });
    }
};
*/

/*
export const getDeliveryBoyAssignment = async (req, res) => {
    try {
        const deliveryBoy = await User.findById(req.userId);

        if (!deliveryBoy?.location?.coordinates) {
            return res.status(400).json({
                message: "Delivery boy location not found"
            });
        }

        const [lng, lat] = deliveryBoy.location.coordinates;

        // ✅ FIX 1: Only fetch relevant orders
        const orders = await orderModel
            .find({ "shopOrders.status": "out for delivery" })
            .populate("shopOrders.shop", "name")
            .populate("user", "fullName email mobile location");

        let result = [];

        for (let order of orders) {
            if (!order.deliveryAddress) continue;

            const orderLng = Number(order.deliveryAddress.longitude);
            const orderLat = Number(order.deliveryAddress.latitude);

            const distance =
                Math.sqrt(
                    Math.pow(lat - orderLat, 2) +
                    Math.pow(lng - orderLng, 2)
                ) * 111000;

            if (distance <= 50000) {
                for (let so of order.shopOrders) {

                    if (
                        so.status === "out for delivery" &&
                        !so.assignedDeliveryBoy &&
                        so.assignment
                    ) {
                        // ✅ FIX 2: check assignment
                        const assignment = await DeliveryAssignment.findById(so.assignment);

                        if (!assignment) continue;

                        // ❌ skip if already assigned
                        if (assignment.status !== "broadcasted") continue;

                        // ❌ skip if not meant for this delivery boy
                        const isAllowed = assignment.broadcastedTo
                            .map(id => id.toString())
                            .includes(req.userId.toString());

                        if (!isAllowed) continue;

                        result.push({
                            assignmentId: so.assignment,
                            shopName: so.shop?.name || "Shop",
                            deliveryAddress: order.deliveryAddress,
                            shopOrder: so,
                            user: order.user,
                            deliveryBoyLocation: { lat, lon: lng },
                            customerLocation: {
                                lat: order.deliveryAddress.latitude,
                                lon: order.deliveryAddress.longitude
                            }
                        });
                    }
                }
            }
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
*/




/*
export const getDeliveryBoyAssignment = async (req, res) => {
    try {
        const deliveryBoy = await User.findById(req.userId);

        if (!deliveryBoy?.location?.coordinates) {
            return res.status(400).json({ message: "Delivery boy location not found" });
        }

        const [lng, lat] = deliveryBoy.location.coordinates;

        // ✅ FIXED HERE ONLY
        const orders = await orderModel
            .find({ "shopOrders.status": { $regex: /^out for delivery$/i } })
            .populate("shopOrders.shop", "name")
            .populate("user", "fullName email mobile location");

        let result = [];

        for (let order of orders) {
            if (!order.deliveryAddress) continue;

            const orderLng = Number(order.deliveryAddress.longitude);
            const orderLat = Number(order.deliveryAddress.latitude);

            const distance =
                Math.sqrt(Math.pow(lat - orderLat, 2) + Math.pow(lng - orderLng, 2)) * 111000;

            if (distance <= 50000) {
                for (let so of order.shopOrders) {
                    if (
                        so.status?.toLowerCase() === "out for delivery" &&
                        !so.assignedDeliveryBoy &&
                        so.assignment
                    ) {
                        const assignment = await DeliveryAssignment.findById(so.assignment);
                        if (!assignment) continue;
                        if (assignment.status !== "broadcasted") continue;

                        const isBroadcasted = assignment.broadcastedTo
                            .map(String)
                            .includes(String(req.userId));

                        if (!isBroadcasted) continue;

                        result.push({
                            assignmentId: so.assignment,
                            orderId: order._id,
                            shopName: so.shop?.name || "Shop",
                            deliveryAddress: order.deliveryAddress,
                            shopOrder: so,
                            user: order.user,
                            deliveryBoyLocation: { lat, lon: lng },
                            customerLocation: {
                                lat: order.deliveryAddress.latitude,
                                lon: order.deliveryAddress.longitude,
                            },
                        });
                    }
                }
            }
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};*/
export const getDeliveryBoyAssignment = async (req, res) => {
    try {
        const deliveryBoy = await User.findById(req.userId);

        let lat = 0;
        let lng = 0;

        if (deliveryBoy?.location?.coordinates) {
            [lng, lat] = deliveryBoy.location.coordinates;
        }

        const orders = await orderModel
            .find({ "shopOrders.status": { $regex: /^out for delivery$/i } })
            .populate("shopOrders.shop", "name")
            .populate("user", "fullName email mobile location");

        let result = [];

        for (let order of orders) {
            if (!order.deliveryAddress) continue;

            const orderLng = Number(order.deliveryAddress.longitude);
            const orderLat = Number(order.deliveryAddress.latitude);

            const distance =
                Math.sqrt(
                    Math.pow(lat - orderLat, 2) +
                    Math.pow(lng - orderLng, 2)
                ) * 111000;

            if (distance <= 50000 || lat === 0) {
                for (let so of order.shopOrders) {
                    if (
                        so.status?.toLowerCase() === "out for delivery" &&
                        !so.assignedDeliveryBoy &&
                        so.assignment
                    ) {
                        const assignment = await DeliveryAssignment.findById(so.assignment);
                        if (!assignment) continue;

                        // ✅ allow both states
                        if (!["broadcasted", "assigned"].includes(assignment.status)) continue;

                        // ✅ SAFE CHECK (FIXED LINE)
                        const isAllowed =
                            !assignment.broadcastedTo?.length ||
                            assignment.broadcastedTo.map(String).includes(String(req.userId));

                        if (!isAllowed) continue;

                        result.push({
                            assignmentId: so.assignment,
                            orderId: order._id,
                            shopName: so.shop?.name || "Shop",
                            deliveryAddress: order.deliveryAddress,
                            shopOrder: so,
                            user: order.user,
                            deliveryBoyLocation: { lat, lon: lng },
                            customerLocation: {
                                lat: order.deliveryAddress.latitude,
                                lon: order.deliveryAddress.longitude,
                            },
                        });
                    }
                }
            }
        }

        return res.status(200).json(result);

    } catch (error) {
        console.log("DELIVERY ERROR:", error);
        return res.status(500).json({ message: error.message });
    }
};



/*
export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params; // shopOrderId

        // 🔍 FIND ORDER
        const order = await orderModel.findOne({
            "shopOrders._id": assignmentId
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // 🔍 FIND SHOP ORDER
        const shopOrder = order.shopOrders.find(
            so => so._id.toString() === assignmentId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "Shop order not found" });
        }

        // ❌ ALREADY ACCEPTED
        if (shopOrder.assignedDeliveryBoy) {
            return res.status(400).json({
                message: "Order already accepted"
            });
        }

        // ❌ CHECK BUSY (🔥 FIXED)
        const alreadyAssigned = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        });

        if (alreadyAssigned) {
            return res.status(400).json({
                message: "You already have an active order"
            });
        }

        // ✅ ASSIGN ORDER
        shopOrder.assignedDeliveryBoy = req.userId;
        shopOrder.status = "out for delivery";

        await order.save();

        // 🔥 CREATE DELIVERY ASSIGNMENT (IMPORTANT)
        await DeliveryAssignment.create({
            order: order._id,
            shop: shopOrder.shop,
            shopOrderId: shopOrder._id,
            assignedTo: req.userId,
            status: "assigned",
            acceptedAt: new Date()
        });

        return res.status(200).json({
            message: "Order accepted successfully"
        });

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            message: `accept order error: ${error.message}`
        });
    }
};*/


/*
export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        const order = await orderModel.findOne({
            "shopOrders._id": assignmentId
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrders.find(
            so => so._id.toString() === assignmentId
        );

        if (!shopOrder) {
            return res.status(400).json({ message: "Shop order not found" });
        }

        if (shopOrder.assignedDeliveryBoy) {
            return res.status(400).json({
                message: "Order already accepted"
            });
        }

        // 🔥 FIX: ONLY block if active (not completed)
        const activeAssignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: { $ne: "completed" }   // ✅ FIX HERE
        });

        if (activeAssignment) {
            return res.status(400).json({
                message: "You already have an active order"
            });
        }

        // ✅ assign
        shopOrder.assignedDeliveryBoy = req.userId;
        shopOrder.status = "out for delivery";

        await order.save();

        await DeliveryAssignment.create({
            order: order._id,
            shop: shopOrder.shop,
            shopOrderId: shopOrder._id,
            assignedTo: req.userId,
            status: "assigned",
            acceptedAt: new Date()
        });

        return res.status(200).json({
            message: "Order accepted successfully"
        });

    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            message: `accept order error: ${error.message}`
        });
    }
};*/

/*
export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // ✅ FIND ASSIGNMENT
        const assignment = await DeliveryAssignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // ❌ already taken
        if (assignment.assignedTo) {
            return res.status(400).json({
                message: "Order already accepted"
            });
        }

        // ❌ check if delivery boy already busy
        const activeAssignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        });

        if (activeAssignment) {
            return res.status(400).json({
                message: "You already have an active order"
            });
        }

        // ✅ assign delivery boy
        assignment.assignedTo = req.userId;
        assignment.status = "assigned";
        await assignment.save();

        // ✅ update shopOrder
        const order = await orderModel.findById(assignment.order);

        const shopOrder = order.shopOrders.id(assignment.shopOrderId);

        shopOrder.assignedDeliveryBoy = req.userId;

        await order.save();

        return res.status(200).json({
            message: "Order accepted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `accept order error: ${error.message}`
        });
    }
};*/







export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // ✅ find assignment
        const assignment = await DeliveryAssignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // ❌ already taken
        if (assignment.assignedTo) {
            return res.status(400).json({
                message: "Order already accepted"
            });
        }

        // ❌ delivery boy already busy
        const active = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        });

        if (active) {
            return res.status(400).json({
                message: "You already have an active order"
            });
        }

        // ✅ assign
        assignment.assignedTo = req.userId;
        assignment.status = "assigned";
        await assignment.save();

        // ✅ update shopOrder
        const order = await orderModel.findById(assignment.order);

        const shopOrder = order.shopOrders.id(assignment.shopOrderId);

        shopOrder.assignedDeliveryBoy = req.userId;

        await order.save();

        return res.status(200).json({
            message: "Order accepted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: `accept error: ${error.message}`
        });
    }
};





// ================= REJECT ORDER =================
export const rejectOrder = async (req, res) => {

    try {

        const { assignmentId } = req.params;

        const assignment = await DeliveryAssignment.findById(
            assignmentId
        );

        if (!assignment) {

            return res.status(404).json({
                message: "Assignment not found"
            });

        }

        // remove this delivery boy
        assignment.broadcastedTo =
            assignment.broadcastedTo.filter(
                (id) =>
                    id.toString() !== req.userId.toString()
            );

        // if all delivery boys rejected
        if (assignment.broadcastedTo.length === 0) {

            assignment.status = "rejected";

        }

        await assignment.save();

        return res.status(200).json({
            message: "Order rejected successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: `reject order error: ${error.message}`
        });

    }
};












/*
export const getCurrentOrder = async (req, res) => {
    try {
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        })
            .populate("shop", "name")
            .populate("assignedTo", "fullName email mobile location")
            .populate({
                path: "order",
                populate: [{ path: "user", select: "fullName email location mobile" }]

            })

        if (!assignment) {
            return res.status(400).json({
                message: "assignment not found"
            });
        }
        if (!assignment.order) {
            return res.status(400).json({
                message: "order not found"
            });
        }

        const shopOrder = assignment.order.shopOrders.find(so => toString(so._id) == String(assignment.shopOrderId))

        if (!shopOrder) {
            return res.status(400).json({ message: "shopOrder not found" })
        }

        let deliveryBoyLocation = { lat: null, lon: null }
        if (assignment.assignedTo.location.coordinates.length == 2) {
            deliveryBoyLocation.lat = assignment.assignedTo.location.coordinates[1]
            deliveryBoyLocation.lat = assignment.assignedTo.location.coordinates[0]
        }

        let customerLocation = { lat: null, lon: null }
        if (assignment.order.deliveryAddress) {
            customerLocation.lat = assignment.order.deliveryAddress.latitude
            customerLocation.lon = assignment.order.deliveryAddress.longitude
        }

        return res.status(200).json({
            _id: assignment.order._id,
            user: assignment.order.user,
            shopOrder,
            deliveryAddress: assignment.order.deliveryAddress,
            deliveryBoyLocation,
            customerLocation
        })

    } catch (error) {
        return res.status(500).json({
            message: `current order error: ${error.message}`
        });
    }
}*/


/*
export const getCurrentOrder = async (req, res) => {
    try {
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        })
            .populate("shop", "name")
            .populate("assignedTo", "fullName email mobile location")
            .populate({
                path: "order",
                populate: [
                    {
                        path: "user",
                        select: "fullName email mobile location"
                    }
                ]
            });

        // ❌ assignment not found
       if (!assignment) {
            return res.status(400).json({
                message: "assignment not found"
            });
        }

        // ❌ order not found
        if (!assignment.order) {
            return res.status(400).json({
                message: "order not found"
            });
        }
}

        // ✅ FIX: correct ObjectId comparison
        const shopOrder = assignment.order.shopOrders.find(
            (so) => so._id.toString() === assignment.shopOrderId.toString()
        );

        if (!shopOrder) {
            return res.status(400).json({
                message: "shopOrder not found"
            });
        }

        // ✅ DELIVERY BOY LOCATION
        let deliveryBoyLocation = { lat: null, lon: null };

        if (assignment.assignedTo?.location?.coordinates?.length === 2) {
            deliveryBoyLocation.lat =
                assignment.assignedTo.location.coordinates[1]; // lat
            deliveryBoyLocation.lon =
                assignment.assignedTo.location.coordinates[0]; // lon
        }

        // ✅ CUSTOMER LOCATION
        let customerLocation = { lat: null, lon: null };

        if (assignment.order.deliveryAddress) {
            customerLocation.lat =
                assignment.order.deliveryAddress.latitude;
            customerLocation.lon =
                assignment.order.deliveryAddress.longitude;
        }

        // ✅ FINAL RESPONSE (MATCH LEFT SIDE EXACTLY)
        return res.status(200).json({
            _id: assignment.order._id,

            // 🔥 user info
            user: assignment.order.user,

            // 🔥 shop order (full object)
            shopOrder,

            // 🔥 address
            deliveryAddress: assignment.order.deliveryAddress,

            // 🔥 locations (important)
            deliveryBoyLocation,
            customerLocation,

            // 🔥 shop info
            shop: assignment.shop
        });

    } catch (error) {
        return res.status(500).json({
            message: `current order error: ${error.message}`
        });
    }
};
*/


export const getCurrentOrder = async (req, res) => {
    try {
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        })
            .populate("shop", "name")
            .populate("assignedTo", "fullName email mobile location")
            .populate({
                path: "order",
                populate: [
                    {
                        path: "user",
                        select: "fullName email mobile location"
                    }
                ]
            });

        // ✅ FIX 1: NO assignment → return null (NOT ERROR)
        if (!assignment || !assignment.order) {
            return res.status(200).json(null);
        }

        // ✅ FIX 2: correct ObjectId comparison + filter delivered
        const shopOrder = assignment.order.shopOrders.find(
            (so) =>
                so._id.toString() === assignment.shopOrderId.toString() &&
                so.status !== "delivered"
        );

        // ✅ FIX 3: if delivered → return null
        if (!shopOrder) {
            return res.status(200).json(null);
        }

        // ✅ DELIVERY BOY LOCATION
        let deliveryBoyLocation = { lat: null, lon: null };

        if (assignment.assignedTo?.location?.coordinates?.length === 2) {
            deliveryBoyLocation.lat =
                assignment.assignedTo.location.coordinates[1];
            deliveryBoyLocation.lon =
                assignment.assignedTo.location.coordinates[0];
        }

        // ✅ CUSTOMER LOCATION
        let customerLocation = { lat: null, lon: null };

        if (assignment.order.deliveryAddress) {
            customerLocation.lat =
                assignment.order.deliveryAddress.latitude;
            customerLocation.lon =
                assignment.order.deliveryAddress.longitude;
        }

        // ✅ FINAL RESPONSE
        return res.status(200).json({
            _id: assignment.order._id,
            user: assignment.order.user,
            shopOrder,
            deliveryAddress: assignment.order.deliveryAddress,
            deliveryBoyLocation,
            customerLocation,
            shop: assignment.shop
        });

    } catch (error) {
        return res.status(500).json({
            message: `current order error: ${error.message}`
        });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ message: "Invalid order id" });
        }

        const order = await orderModel.findById(orderId)
            .populate("user", "fullName email mobile location")
            .populate({
                path: "shopOrders",
                populate: [
                    {
                        path: "shop",
                        select: "name"
                    },
                    {
                        path: "assignedDeliveryBoy",
                        select: "fullName email mobile location"
                    },
                    {
                        path: "shopOrderItems.item",
                        select: "name price image"
                    }
                ]
            })
            .lean();

        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }

        return res.status(200).json(order);

    } catch (error) {
        console.log("🔥 ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};



export const sendDeliveryOtp = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId).populate("user");
        if (!order) {
            return res.status(400).json({ message: "Invalid orderId" });
        }

        // 🔥 FIX: find index instead of find()
        const shopOrderIndex = order.shopOrders.findIndex(
            s => s.status === "out for delivery"
        );

        if (shopOrderIndex === -1) {
            return res.status(400).json({ message: "No active delivery order found" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // ✅ IMPORTANT FIX
        //order.shopOrders[shopOrderIndex].resetOtp = otp;
        order.shopOrders[shopOrderIndex].deliveryOtp = otp;
        order.shopOrders[shopOrderIndex].otpExpires = Date.now() + 5 * 60 * 1000;

        await order.save();

        console.log("GENERATED OTP:", otp);

        await sendDeliveryOtpMail(order.user.email, otp);

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.log("OTP ERROR:", error);
        return res.status(500).json({
            message: error.message
        });
    }
};


/*

export const verifyDeliveryOtp = async (req, res) => {
  try {
    const { orderId, shopOrderId, otp } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(400).json({ message: "Invalid orderId" });
    }

    const shopOrder = order.shopOrders.id(shopOrderId);

    if (!shopOrder) {
      return res.status(400).json({ message: "Invalid shopOrderId" });
    }

    const enteredOtp = otp.toString().trim();
    const storedOtp = shopOrder.deliveryOtp?.toString().trim();

    console.log("ENTERED:", enteredOtp);
    console.log("STORED:", storedOtp);

    if (
      !storedOtp ||
      storedOtp !== enteredOtp ||
      !shopOrder.otpExpires ||
      shopOrder.otpExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    // ✅ SUCCESS
    shopOrder.status = "delivered";
    shopOrder.deliveryOtp = null;
    shopOrder.otpExpires = null;

    await order.save();

    return res.status(200).json({
      message: "Order Delivered Successfully"
    });

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};*/






/*
export const verifyDeliveryOtp = async (req, res) => {
    try {
        const { orderId, shopOrderId, otp } = req.body;

        const order = await orderModel.findById(orderId);

        const shopOrder = order.shopOrders.id(shopOrderId);

        if (!shopOrder) {
            return res.status(400).json({ message: "Shop order not found" });
        }

        if (shopOrder.deliveryOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ✅ mark delivered
        shopOrder.status = "delivered";
        shopOrder.deliveredAt = new Date();

        // 🔥 VERY IMPORTANT
        const assignment = await DeliveryAssignment.findById(shopOrder.assignment);

        if (assignment) {
            assignment.status = "completed";   // ✅ THIS FIXES YOUR ERROR
            await assignment.save();
        }

        await order.save();

        return res.status(200).json({
            message: "Order delivered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
*/


export const verifyDeliveryOtp = async (req, res) => {
    try {
        const { orderId, shopOrderId, otp } = req.body;

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrders.id(shopOrderId);

        if (!shopOrder) {
            return res.status(400).json({ message: "Shop order not found" });
        }

        if (!shopOrder.deliveryOtp || shopOrder.deliveryOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // ✅ mark delivered
        shopOrder.status = "delivered";
        shopOrder.deliveredAt = new Date();

        // ✅ CLEAR OTP (important)
        shopOrder.deliveryOtp = null;
        shopOrder.otpExpires = null;

        // 🔥 FIX: update payment for COD
        if (order.paymentMethod === "cod") {
            order.payment = true;
        }

        // 🔥 VERY IMPORTANT (your existing fix - correct)
        const assignment = await DeliveryAssignment.findById(shopOrder.assignment);

        if (assignment) {
            assignment.status = "completed";
            await assignment.save();
        }

        await order.save();

        return res.status(200).json({
            message: "Order delivered successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

/*
export const getTodayDeliveries=async (req,res) => {
    try {
        const deliveryBoyId=req.userId
        const startsOfDay=new Date()
        startsOfDay.setHours(0,0,0,0)

        const orders=await Order.find({
            "shopOrders.assignedDeliveryBoy":deliveryBoyId,
            "shopOrders.status":"delivered",
            "shopOrders.deliveredAt":{$gte:startsOfDay}
        }).lean()

        let todaysDeliveries=[]

        orders.forEach(order=>{
            order.shopOrders.forEach(shopOrder=>{
                if(shopOrder.assignedDeliveryBoy==deliveryBoyId && shopOrder.status=="delivered" && 
                shopOrder.deliveredAt &&
                shopOrder.deliveredAt>=startsOfDay
                ){
                    todaysDeliveries.push(shopOrder)
                }
            })
        })

        let stats={}

        todaysDeliveries.forEach(shopOrder=>{
            const hour=new Date(shopOrder.deliveredAt).getHours()
            stats[hour]=(stats[hour] || 0) + 1
        })

        let formattedStats=Object.keys(stats).map(hour=>({
            hour:parseInt(hour),
            count:stats[hour]
        }))

     formattedStats.sort((a,b)=>a.hour-b.hour)

     return res.status(200).json(formattedStats)

        
    } catch (error) {
        return res.status(500).json({
            message: `today deliveries error`})
    }
}*/


export const getTodayDeliveries = async (req, res) => {
  try {
    const deliveryBoyId = req.userId;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // ✅ Fetch only relevant orders (don’t over-filter in Mongo)
    const orders = await orderModel.find({
      "shopOrders.assignedDeliveryBoy": deliveryBoyId
    }).lean();

    let todaysDeliveries = [];

    // ✅ Correct filtering (THIS IS THE MAIN FIX)
    orders.forEach(order => {
      order.shopOrders.forEach(shopOrder => {
        if (
          shopOrder.assignedDeliveryBoy?.toString() === deliveryBoyId.toString() &&
          shopOrder.status === "delivered" &&
          shopOrder.deliveredAt &&
          new Date(shopOrder.deliveredAt) >= startOfDay &&
          new Date(shopOrder.deliveredAt) <= endOfDay
        ) {
          todaysDeliveries.push(shopOrder);
        }
      });
    });

    // ✅ Create hourly stats
    const stats = {};

    todaysDeliveries.forEach(shopOrder => {
      const hour = new Date(shopOrder.deliveredAt).getHours();
      stats[hour] = (stats[hour] || 0) + 1;
    });

    const formattedStats = Object.keys(stats)
      .map(hour => ({
        hour: Number(hour),
        count: stats[hour]
      }))
      .sort((a, b) => a.hour - b.hour);

    return res.status(200).json(formattedStats);

  } catch (error) {
    console.error("🔥 TODAY DELIVERY ERROR:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};


// ================= DELIVERY HISTORY =================
export const getDeliveryHistory = async (req, res) => {
  try {

    const orders = await orderModel
      .find({
        "shopOrders.assignedDeliveryBoy": req.userId,
        "shopOrders.status": "delivered"
      })
      .sort({ createdAt: -1 })
      .populate("user", "fullName email mobile")
      .populate("shopOrders.shop", "name")
      .populate(
        "shopOrders.shopOrderItems.item",
        "name image price"
      )
      .populate(
        "shopOrders.assignedDeliveryBoy",
        "fullName mobile"
      );

    let deliveryHistory = [];

    orders.forEach((order) => {

      const deliveredShopOrders = order.shopOrders.filter(
        (shopOrder) =>
          shopOrder.assignedDeliveryBoy?._id?.toString() ===
            req.userId.toString() &&
          shopOrder.status === "delivered"
      );

      deliveredShopOrders.forEach((shopOrder) => {
        deliveryHistory.push({
          orderId: order._id,

          customer: order.user,

          shop: shopOrder.shop,

          deliveryAddress: order.deliveryAddress,

          paymentMethod: order.paymentMethod,

          payment: order.payment,

          totalAmount: shopOrder.subTotal,

          status: shopOrder.status,

          deliveredAt: shopOrder.deliveredAt,

          items: shopOrder.shopOrderItems,

          createdAt: order.createdAt
        });
      });
    });

    return res.status(200).json(deliveryHistory);

  } catch (error) {

    return res.status(500).json({
      message: `delivery history error: ${error.message}`
    });

  }
};