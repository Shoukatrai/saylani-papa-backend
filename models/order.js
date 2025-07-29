import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  menuId: String,
});

export const OrderModel = mongoose.model("order", orderSchema);
