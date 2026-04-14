/*import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(400).json({ message: "shop not found" })
        }
        const item = await Item.create({
            name, category, foodType, price, image, shop: shop._id
        })

        return res.status(201).json(shop)

    } catch (error) {
        return res.status(500).json({ message: `add item error ${error}` })
    }
}

export const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const { name, category, foodType, price } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category, foodType, price, image
        }, { new: true })
        if (!item) {
            return res.status(400).json({ message: "shop not found" })
        }
        return res.status(201).json(item)

    } catch (error) {
        return res.status(500).json({ message: `edit item error ${error}` })
    }
}*/



/*

import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";


// ================= ADD ITEM =================
export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body;

        // ✅ validation
        if (!name || !category || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ upload image
        let image = "";
        if (req.file) {
            const uploaded = await uploadOnCloudinary(req.file.path);
            image = uploaded?.secure_url || "";
        }

        // ✅ find shop
        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        // ✅ create item
        const item = await Item.create({
            name,
            category,
            foodType,
            price,
            image,
            shop: shop._id
        });

        shop.items.push(item._id)
        await shop.save()
        await shop.populate("item owner")

        return res.status(201).json({
            success: true,
            item
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Add item error",
            error: error.message
        });
    }
};


// ================= EDIT ITEM =================
export const editItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, category, foodType, price } = req.body;

        const existingItem = await Item.findById(itemId);
        if (!existingItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        let image = existingItem.image; // ✅ keep old image

        if (req.file) {
            const uploaded = await uploadOnCloudinary(req.file.path);
            image = uploaded?.secure_url || existingItem.image;
        }

        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            {
                name,
                category,
                foodType,
                price,
                image
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            item: updatedItem
        });
        

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Edit item error",
            error: error.message
        });
    }
};
*/

/*
import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";


// ================= ADD ITEM =================
export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body;

        // ✅ validation
        if (!name || !category || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // ✅ upload image
        let image = "";

        if (req.file) {
            const uploaded = await uploadOnCloudinary(req.file.path);

            // ✅ FIX: uploaded is already URL string
            image = uploaded || "";
        }

        // ✅ find shop
        const shop = await Shop.findOne({ owner: req.userId });
        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        // ✅ create item
        const item = await Item.create({
            name,
            category,
            foodType,
            price,
            image,
            shop: shop._id
        });

        // ✅ push item into shop
        shop.items.push(item._id);
        await shop.save();

        // ✅ FIX: correct populate field
        await shop.populate("items");

        return res.status(201).json({
            success: true,
            item
        });

    } catch (error) {
        console.error("🔥 REAL ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


// ================= EDIT ITEM =================
export const editItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, category, foodType, price } = req.body;

        const existingItem = await Item.findById(itemId);
        if (!existingItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        let image = existingItem.image;

        if (req.file) {
            const uploaded = await uploadOnCloudinary(req.file.path);

            // ✅ FIX HERE ALSO
            image = uploaded || existingItem.image;
        }

        const updatedItem = await Item.findByIdAndUpdate(
            itemId,
            {
                name,
                category,
                foodType,
                price,
                image
            },
            { new: true }
        );
        const shop=await Shop.findOne({owner:req.userId}).populate("items")

        return res.status(200).json({
            success: true,
            shop: updatedShop
        });

    } catch (error) {
        console.error("🔥 REAL ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};

export const getItemById=async (req,res) => {
    try {
        const itemId=req.params.itemId
        const item=await Item.findById(itemId)
        if(!item){
            return res.status(400).json({ message: "item not found" })
        }
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({
            message: `get item error ${error}`
    })
}
}
*/




import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";


// ================= ADD ITEM =================
export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body;

        if (!name || !category || !price) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        let image = "";

        if (req.file) {
            const uploaded = await uploadOnCloudinary(req.file.path);
            image = uploaded || "";
        }

        const shop = await Shop.findOne({ owner: req.userId });
        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        const item = await Item.create({
            name,
            category,
            foodType,
            price,
            image,
            shop: shop._id
        });

        shop.items.push(item._id);
        await shop.save();

        // ✅ FIXED POPULATE
        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } } // latest first
        });

        return res.status(201).json({
            success: true,
            shop
        });

    } catch (error) {
        console.error("🔥 ADD ITEM ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


// ================= EDIT ITEM =================
export const editItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, category, foodType, price } = req.body;

        const existingItem = await Item.findById(itemId);
        if (!existingItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        let image = existingItem.image;

        if (req.file) {
            const uploaded = await uploadOnCloudinary(req.file.path);
            image = uploaded || existingItem.image;
        }

        await Item.findByIdAndUpdate(
            itemId,
            {
                name,
                category,
                foodType,
                price,
                image
            },
            { returnDocument: "after" }
        );

        // ✅ FETCH UPDATED SHOP
        const shop = await Shop.findOne({ owner: req.userId })
            .populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            });

        return res.status(200).json({
            success: true,
            shop
        });

    } catch (error) {
        console.error("🔥 EDIT ITEM ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


// ================= GET ITEM BY ID =================
export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json(item);

    } catch (error) {
        console.error("🔥 GET ITEM ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};
/*
export const deleteItem=async (req,res) => {
    try {
        const itemId=req.params.itemId
        const item=await Item.findByIdAndDelete(itemId)
         if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }
        const shop=await Shop.findOne({owner:req.userId})
        shop.items=shop.items.filter(i=>i._id!==item._id)
        await shop.save()
        await shop.populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            });
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({
            message: `delete item error ${error}`
        })
    }
}*/

export const deleteItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await Item.findByIdAndDelete(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        const shop = await Shop.findOne({ owner: req.userId });

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found"
            });
        }

        // ✅ FIXED comparison
        shop.items = shop.items.filter(
            (id) => id.toString() !== itemId
        );

        await shop.save();

        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        });

        // ✅ FIXED RESPONSE FORMAT
        return res.status(200).json({
            success: true,
            shop
        });

    } catch (error) {
        console.error("🔥 DELETE ERROR:", error);

        return res.status(500).json({
            message: error.message
        });
    }
};


export const getItemByCity=async (req,res) => {
    try {
        const {city}=req.params
        if(!city){
            return res.status(400).json({message:"city is required"})
        }
        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`, "i")}
        }).populate('items')
        if(!shops){
            return res.status(400).json({message:"shops not found"})
        }
        const shopIds=shops.map((shop)=>shop._id)

        const items=await Item.find({shop:{$in:shopIds}})
        return res.status(200).json(items)

    } catch (error) {
        console.error("🔥 GET ITEM BY CITY:", error);

        return res.status(500).json({
            message: error.message
        });
    }
}