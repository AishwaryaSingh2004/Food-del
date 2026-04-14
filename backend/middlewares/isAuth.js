/*const isAuth=async (req,res,next) => {
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        if(!decodeToken){
            return res.status(400).json({message:"token not verified"})
 }
    console.log(decodeToken)
    req.userId=decodeToken.userId
    next()
    } catch (error) {
        return res.status(500).json({message:"isAuth error"})
    }
}
export default isAuth*/

/*
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res.status(401).json({ message: "Token not verified" });
    }

    

    req.userId = decodeToken.userId;

    next();

  } catch (error) {
    return res.status(500).json({ message: "isAuth error" });
  }
};

export default isAuth;*/

/*
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {

    // ✅ GET TOKEN FROM HEADER
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not found" });
    }

    // ✅ EXTRACT TOKEN (Bearer <token>)
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token malformed" });
    }

    // ✅ VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Token not verified" });
    }

    // ✅ ATTACH USER ID
    req.userId = decoded.userId;
    //req.userId = decoded.id;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;*/

/*
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not found" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token malformed" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ FIX HERE
    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;*/

/*
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token;

    // ✅ 1. Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // ✅ 2. Check cookies (for withCredentials)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ Attach userId
    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;*/

/*
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token;

    // ✅ 1. Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // ✅ 2. Check cookies (for withCredentials)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 🔥 FINAL FIX (IMPORTANT)
    req.userId = decoded.id || decoded._id || decoded.userId;
    

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuth;
*/


import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token;

    // ✅ Get token from header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // ✅ Or from cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token not found",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }

    // ✅ SAFE FIX (supports all cases)
    req.userId = decoded.id || decoded._id || decoded.userId;

    // ❌ Still missing? then error
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized - userId missing in token",
      });
    }

    next();

  } catch (error) {
    console.log("Auth Error:", error.message);

    return res.status(401).json({
      message: "Unauthorized - Invalid or expired token",
    });
  }
};

export default isAuth;