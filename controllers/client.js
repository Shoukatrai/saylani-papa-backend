import { OrderModel } from "../models/order.js";
import { RestaurantMenuModel } from "../models/restaurantMenu.js";
import { restaurantModel } from "../models/restaurantSchema.js";
import { userModel } from "../models/userSchema.js";

export const getUser3topRestaurants = async (req, res) => {
  try {
    const restaurantRes = await restaurantModel.find({
      isDeleted: false,
      isApproved: true,
    }).limit(3);
    console.log("restaurantRes", restaurantRes);

    res.json({
      status: true,
      message: "all restaurants get",
      data: restaurantRes,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: restaurantRes,
    });
  }
};

export const getUserAllMenu = async (req, res) => {
  try {
    const menuRes = await RestaurantMenuModel.find().limit(3);
    console.log("menuRes", menuRes);

    res.json({
      status: true,
      message: "all menus get",
      data: menuRes,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const makeNewOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("userId", userId);
    const user = await userModel.findById(userId);
    console.log("user", user);
    console.log("user", user.type);
    if (user.type !== "customer") {
      return res.json({
        status: false,
        message: "Only customer can access?",
        data: response,
      });
    }
    const body = {
      ...req.body,
      createdBy: userId,
      customerName: user.fullName,
    };

    const response = await OrderModel.create(body);
    console.log("response", response);

    res.json({
      status: true,
      message: "Order placed Successfully",
      data: response,
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message,
      data: null,
    });
  }
};



export const getAllRestaurant = async (req, res) => {
  try {
    const restaurantRes = await restaurantModel.find({
      isDeleted: false,
      isApproved: true,
    });
    console.log("restaurantRes", restaurantRes);

    res.json({
      status: true,
      message: "all restaurants get",
      data: restaurantRes,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: restaurantRes,
    });
  }
};

export const getOrderByStatus =async(req, res)=>{
  try {
    const {status} = req.query
    console.log("status" , status)
  } catch (error) {
    
  }
}