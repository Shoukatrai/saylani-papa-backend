import express from "express";
import { uploadImageController } from "../controllers/uploadImage.js";
import { checkAuth } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";


const imageRouter = express.Router()




imageRouter.post("/upload", [checkAuth, upload.single("image")], uploadImageController)



export default imageRouter 