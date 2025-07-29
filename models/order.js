import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  menuId: { type: String, required: true },
  menuName: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    items: [itemSchema], 
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
    createdBy: { type: String }, 
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("order", orderSchema);
