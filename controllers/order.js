import { OrderModel } from "../models/order.js";
import { userModel } from "../models/userSchema.js";
import { orderUpdateTemp } from "../templates/orderUpdate.js";
import nodemailer from "nodemailer"

export const getAllOrder = async (req, res) => {
  try {
    const response = await OrderModel.find({});
    console.log("response", response);
    res.json({
      status: true,
      message: "all orders",
      data: response,
    });
  } catch (error) {
    res.json({
      status: true,
      message: "all orders",
      data: null,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const body = {
      orderStatus: req.body.orderStatus,
    };
    const response = await OrderModel.findByIdAndUpdate(id, body);
    console.log("response", response);
    //send updateHotel
    const user = await userModel.findById(req.user.id);
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
      to: user.email,
      subject: "Order Status Update",
      html: orderUpdateTemp(req.body.orderStatus , response),
    };
    const emailResponse = await transporter.sendMail(mailOptions);

    res.json({
      status: true,
      message: "Order Status Updated!",
      data: response , emailResponse,
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message,
      data: null,
    });
  }
};

