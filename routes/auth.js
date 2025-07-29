import express from "express";
import { login, signup, verifyUser } from "../controllers/auth.js";

const authRouter = express.Router()



authRouter.post("/signup" , signup)
authRouter.post("/login" , login)
authRouter.patch("/verify-email" , verifyUser)


export default authRouter