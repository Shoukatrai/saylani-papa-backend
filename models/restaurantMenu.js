import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
  menuName: {
    type: String,
    required: true,
  },
  menuDetails: {
    type: String,
    required: true,
  },
  menuPrice: {
    type: String
  },
  menuCategory: {
    type: String
  },
  imageUrl: {
    type: String
  },
  createdBy: String,
  createdAt :{
    type : Date,
    default : Date.now()
  }
});


export const RestaurantMenuModel = mongoose.model("restaurant-menu" , menuSchema)