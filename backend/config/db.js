/*const connectDb=async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db error")
    }
}

export default connectDb*/


import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log("db connected");
  } catch (error) {
    console.log("❌ DB Error:", error.message);
  }
};

export default connectDb;