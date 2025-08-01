import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { cloudinaryUploader } from "../config/cloudinary.js";
dotenv.config();

cloudinary.config({});

export const uploadImageController = async (req, res) => {
  try {
    const byteArrayBuffer = req.file.buffer;
    console.log("byteArrayBuffer", byteArrayBuffer);
    const result = await cloudinary.uploader.upload_stream((error, result) => {
      if (error) return res.status(500).json({ error });
      return res.status(200).json({
        message: "Uploaded successfully",
        url: result.secure_url,
      });
    });
    console.log("result", result);
    const stream = result;
    stream.end(byteArrayBuffer);
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err });
  }
};