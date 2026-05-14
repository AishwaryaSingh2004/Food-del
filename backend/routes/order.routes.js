/*
import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { acceptOrder, getCurrentOrder, getDeliveryBoyAssignment, getMyOrders, getOrderById, getTodayDeliveries, placeOrder, sendDeliveryOtp, updateorderStatus, verifyDeliveryOtp, verifyPayment, rejectOrder } from "../controllers/order.controller.js"




const orderRouter=express.Router()


orderRouter.post("/place-order",isAuth,placeOrder)

orderRouter.post("/verify-payment",isAuth,verifyPayment)

orderRouter.get("/user-orders",isAuth,getMyOrders)

orderRouter.get("/get-assignments",isAuth,getDeliveryBoyAssignment)

orderRouter.get("/get-current-order",isAuth,getCurrentOrder)

orderRouter.post("/send-delivery-otp",isAuth,sendDeliveryOtp)

orderRouter.post("/verify-delivery-otp",isAuth,verifyDeliveryOtp)

orderRouter.post("/update-status/:orderId/:shopId",isAuth,updateorderStatus)

orderRouter.get('/accept-order/:assignmentId',isAuth,acceptOrder)

orderRouter.post(
  '/reject-order/:assignmentId',
  isAuth,
  rejectOrder
)

orderRouter.get('/get-order-by-id/:orderId',isAuth,getOrderById)

orderRouter.get('/get-today-deliveries',isAuth,getTodayDeliveries)

//orderRouter.get('/get-delivery-history',isAuth,getDeliveryHistory)

export default orderRouter;
*/



import express from "express";
import isAuth from "../middlewares/isAuth.js";

import {
  acceptOrder,
  getCurrentOrder,
  getDeliveryBoyAssignment,
  getMyOrders,
  getOrderById,
  getTodayDeliveries,
  placeOrder,
  sendDeliveryOtp,
  updateorderStatus,
  verifyDeliveryOtp,
  verifyPayment,
  rejectOrder,
  getDeliveryHistory
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

// ================= USER =================

orderRouter.post("/place-order", isAuth, placeOrder);

orderRouter.post("/verify-payment", isAuth, verifyPayment);

orderRouter.get("/user-orders", isAuth, getMyOrders);

// ================= DELIVERY BOY =================

orderRouter.get(
  "/get-assignments",
  isAuth,
  getDeliveryBoyAssignment
);

orderRouter.get(
  "/get-current-order",
  isAuth,
  getCurrentOrder
);

orderRouter.get(
  "/get-delivery-history",
  isAuth,
  getDeliveryHistory
);

orderRouter.get(
  "/get-today-deliveries",
  isAuth,
  getTodayDeliveries
);

orderRouter.post(
  "/send-delivery-otp",
  isAuth,
  sendDeliveryOtp
);

orderRouter.post(
  "/verify-delivery-otp",
  isAuth,
  verifyDeliveryOtp
);

orderRouter.get(
  "/accept-order/:assignmentId",
  isAuth,
  acceptOrder
);

orderRouter.post(
  "/reject-order/:assignmentId",
  isAuth,
  rejectOrder
);

// ================= OWNER =================

orderRouter.post(
  "/update-status/:orderId/:shopId",
  isAuth,
  updateorderStatus
);

// ================= COMMON =================

orderRouter.get(
  "/get-order-by-id/:orderId",
  isAuth,
  getOrderById
);

export default orderRouter;