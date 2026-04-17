/*import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
const uploadOnCloudinary=async (file) => {
    cloudinary.config({ 
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});

    try {
       const result= await cloudinary.uploader.upload(file)
       fs.unlinkSync(file)
        return result.secure_url    
    } catch (error) {
        fs.unlinkSync(file)
        console.log(error)
    }
}

export default uploadOnCloudinary*/



import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ configure ONCE (not inside function)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;

        const result = await cloudinary.uploader.upload(filePath, {
            folder: "vingo_items", // optional folder
        });

        // ✅ delete file safely
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return result.secure_url;

    } catch (error) {
        console.log("Cloudinary Error:", error);

        // ✅ prevent crash
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return null; // VERY IMPORTANT
    }
};

export default uploadOnCloudinary;