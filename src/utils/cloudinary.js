import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinary_cloud_api_key = process.env.CLOUDINARY_API_KEY;
const cloudinary_cloud_api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_cloud_api_key,
  api_secret: cloudinary_cloud_api_secret,
});

const uploadOnCloudinary = async (localFilePath, fileIdentification) => {
  try {
    if (!localFilePath) return null;
    //   upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: auto,
      public_id: fileIdentification,
    });

    console.log("FIle has been uploaded on CLoudinary !! 🚀", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // sync unlinking / remove the locally saved temp files as the upload operation failed
    return null;
  }
};

export { uploadOnCloudinary };

/*
(async function () {
  // Configuration
  
  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);
*/
