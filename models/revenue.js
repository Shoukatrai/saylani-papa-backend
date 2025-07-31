import mongoose from "mongoose";
const RevenueSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    createdBy: { type: String }, 
  },
  {
    timestamps: true,
  }
);