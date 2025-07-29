import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: {
    type :String,
    required: true,
  },
  email: {
    type :String,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default : false
  },
  createdAt :{
    type : Date,
    default : Date.now()
  }
});


export const otpModel = mongoose.model("otp" , otpSchema)