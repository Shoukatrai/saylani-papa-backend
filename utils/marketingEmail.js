import nodemailer from "nodemailer";
import { userModel } from "../models/userSchema.js";
import { marketingEmail } from "../templates/marketingEmail.js";
export const sendMarketingEmailJob = async () => {
  try {
    const users = await userModel.find({
      type: "customer",
      isVerified: true,
    });
    if (!users.length) {
      console.log("No verified users found");
      return;
    }
    console.log("users", users);
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

    users.forEach(async(user) => {
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: user.email,
        subject: "Marketing Emails",
        html: marketingEmail(user.fullName),
      };
       await transporter.sendMail(mailOptions)
    });
  } catch (error) {}
};
