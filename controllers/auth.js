import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userSchema.js";
import nodemailer from "nodemailer";
import { userVerificationEmail } from "../templates/userVerificationEmail.js";
import { otpModel } from "../models/otpSchema.js";
export const signup = async (req, res) => {
  try {
    const body = req.body;
    // CHECK EMAIL
    const isExists = await userModel.findOne({ email: body.email });
    if (isExists) {
      return res.json({
        message: "Email Address Already exists",
        status: false,
        data: null,
      });
    }

    //PASSWORD HASH
    const hashPass = await bcrypt.hash(body.password, 10);

    //createOtp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("otp", otp);
    // SAVE OBJ
    const saveObj = {
      ...body,
      password: hashPass,
    };
    const response = await userModel.create(saveObj);

    //create otp collection....
    await otpModel.create({
      otp,
      email: body.email,
    });

    //send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: response.email,
      subject: "USER VERIFICATION",
      html: userVerificationEmail(otp),
    };

    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("emailResponse", emailResponse);
    //SUCCESS RESPONSE SEND
    res.json({
      message: "Signup successful. Please check your email.",
      status: true,
      data: response,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  const body = req.body;
  try {
    //CHECK USER EXIST OR NOT
    const user = await userModel.findOne({ email: body.email });
    console.log("user", user);
    if (!user) {
      return res.json({
        message: "User not found",
        status: false,
        data: null,
      });
    }

    //PASS CHECK
    const passCheck = await bcrypt.compare(body.password, user.password);
    console.log("passCheck", passCheck);
    if (!passCheck) {
      return res.json({
        message: "Email or password is incorrect!",
        status: false,
        data: null,
      });
    }

    //CREATE TOEKN
    const token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATE_KEY);

    // SUCCESS RES SEND
    res.json({
      message: "Login Successful!",
      status: true,
      data: user,
      token,
    });
  } catch (error) {
    res.json({
      message: error.message || "Something went wrong",
      status: false,
      data: null,
    });
  }
};

// export const verifyUser = async (req, res) => {
//   try {
//     const { otp, email } = req.body;

//     const otpRes = await otpModel.findOne({
//       otp,
//       email,
//       isUsed: false,
//     });

//     if (!otpRes) {
//       return res.status(400).json({
//         message: "OTP is invalid or has expired.",
//         status: false,
//         data: null,
//       });
//     }

//     // Mark OTP as used
//     otpRes.isUsed = true;
//     await otpRes.save();

//     // Mark user as verified
//     await userModel.updateOne({ email }, { isVerified: true });

//     res.status(200).json({
//       message: "User verified successfully.",
//       status: true,
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       status: false,
//       data: null,
//     });
//   }
// };

export const verifyUser = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        message: "OTP and email are required.",
        status: false,
        data: null,
      });
    }

    const otpRes = await otpModel.findOne({ otp, email, isUsed: false });

    if (!otpRes) {
      return res.status(400).json({
        message: "OTP is invalid or used!",
        status: false,
        data: null,
      });
    }

    otpRes.isUsed = true;
    await otpRes.save();

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        status: false,
        data: null,
      });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "User verified successfully.",
      status: true,
      data: { type: user.type }, 
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};
