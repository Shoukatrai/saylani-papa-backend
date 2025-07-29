import jwt from "jsonwebtoken";
import { userModel } from "../models/userSchema.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token" , token)
    if (!token) {
      return res.status(401).json({
        message: "Token missing",
        status: false,
        data: null,
      });
    }

    const isVerify = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (isVerify?.id) {
      req.user = isVerify;
      next();
    } else {
      res.status(401).json({
        message: "UNAUTHORIZED USER!",
        status: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};

export const adminCheckAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token missing",
        status: false,
        data: null,
      });
    }

    const isVerify = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (isVerify?.id) {
      const userRes = await userModel.findById(isVerify?.id);
      if (userRes?.type !== "admin") {
        return res.status(402).json({
          message: "Only admin can access this!",
          status: false,
          data: null,
        });
      }
      req.user = isVerify;
      next();
    } else {
      res.status(401).json({
        message: "UNAUTHORIZED USER!",
        status: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};
