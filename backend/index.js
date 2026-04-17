/*import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

// connect database
connectDb();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});*/





/*
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";
import { Server } from "socket.io";
import App from "../frontend/src/App.jsx";


dotenv.config();

const app = express();
const server=http.createServer(app)
// connect database
connectDb();


const io=new Server(server,{
  cors:{
    origin: "http://localhost:5173",
    credentials: true,
    methods:['POST','GET']
  }
})

App.SET("io","io")

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});*/


import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import itemRouter from "./routes/item.routes.js";
import shopRouter from "./routes/shop.routes.js";
import orderRouter from "./routes/order.routes.js";
import { Server } from "socket.io";
import http from "http"; // ✅ FIX
import { socketHandler } from "./socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ FIX

// connect database
connectDb();

// ✅ SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET"],
  },
});

// ✅ attach io to app (correct way)
app.set("io", io);

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 8000;
socketHandler(io)
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});