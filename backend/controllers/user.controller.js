/*import User from "../models/user.model.js";

export const getCurrentuser=async (requestAnimationFrame,res) => {
    try {
        const userId=req.userId
        if(!userid){
            return res.status(400).json({message:"userid is not found"})
        }
        const user=await User.findById(userId)
        if(!user){
            return res.status(400).json({message:"user is not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`get current user error $(error)`})
    }
}*/
/*

import User from "../models/user.model.js";

export const getCurrentuser = async (req, res) => {
  try {

    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `get current user error ${error}` });
  }
};*/


/*
import User from "../models/user.model.js";
import Shop from "../models/shop.model.js"; // ✅ added

export const getCurrentuser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: `get current user error ${error}` });
  }
};

// ✅ ADD THIS FUNCTION
export const getShopByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const shops = await Shop.find({ city });

    return res.status(200).json(shops);

  } catch (error) {
    return res.status(500).json({ message: `get shop by city error ${error}` });
  }
};

/*
export const updateuserLocation=async (req,res) => {
  try {
    const {lat,lon}=req.body
    const user=await User.findById(req.userId,{
      location:{
        type:"Point",
        coordinates:[lon,lat]
      }
    },{new:true})
    if(!user){
      return res.status(400).json({message:"user is not found"})
    }
    return res.status(200).json({message:'location updated'})
  } catch (error) {
    return res.status(500).json({message:`update location user error ${error}`})
  }
}
*/

/*
export const updateuserLocation = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USERID:", req.userId);

    const { lat, lon } = req.body;

    if (lat === undefined || lon === undefined) {
      return res.status(400).json({
        message: "Latitude and Longitude required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        location: {
          type: "Point",
          coordinates: [lon, lat],
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "user is not found",
      });
    }

    return res.status(200).json({
      message: "location updated",
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      message: `update location error ${error}`,
    });
  }
};*/



import User from "../models/user.model.js";
import Shop from "../models/shop.model.js";

// ✅ GET CURRENT USER
export const getCurrentuser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({
      message: `get current user error ${error}`,
    });
  }
};

// ✅ GET SHOPS BY CITY
export const getShopByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const shops = await Shop.find({ city });

    return res.status(200).json(shops);

  } catch (error) {
    return res.status(500).json({
      message: `get shop by city error ${error}`,
    });
  }
};

// ✅ UPDATE USER LOCATION (FINAL FIXED)
export const updateuserLocation = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USERID:", req.userId);

    const { lat, lon } = req.body;

    // ✅ Validation
    if (lat === undefined || lon === undefined) {
      return res.status(400).json({
        message: "Latitude and Longitude required",
      });
    }

    // 🔥 IMPORTANT: ensure userId exists
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized - userId missing",
      });
    }

    // ✅ Update location
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        location: {
          type: "Point",
          coordinates: [lon, lat],
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        message: "user is not found",
      });
    }

    console.log("UPDATED USER:", user);

    return res.status(200).json({
      message: "location updated",
      location: user.location,
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      message: `update location error ${error}`,
    });
  }
};

