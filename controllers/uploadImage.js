import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs"; // <-- Add this import
import { cloudinaryUploader } from "../config/cloudinary.js";
dotenv.config();

cloudinary.config({
  
});

export const uploadImageController = async (req, res) => {
  try {
    if (!req.files || !req.files[0]) {
      return res.status(400).json({
        status: false,
        message: "No image file provided",
      });
    }

    const filePath = req.files[0].path;
    console.log("Uploading file:", filePath);
    const imageRes = await cloudinaryUploader.upload(filePath);
    console.log("Upload result:", imageRes);

    // Remove file after upload
    fs.unlink(filePath, (err) => {
      if (err) console.log("File delete error:", err);
    });

    res.json({
      message: "IMAGE UPLOAD",
      url: imageRes.secure_url,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};