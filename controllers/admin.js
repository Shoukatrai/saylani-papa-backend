import { OrderModel } from "../models/order.js";
import { restaurantModel } from "../models/restaurantSchema.js";
import { userModel } from "../models/userSchema.js";

export const getAllRestaurants = async (req, res) => {
  try {
    console.log("req");
    const response = await restaurantModel.find();
    console.log("response", response);
    res.json({
      status: true,
      message: "Got All Restaurants",
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const approveRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateObj = {
      isApproved: body.isApproved,
    };

    const response = await restaurantModel.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    console.log("response", response);
    res.json({
      status: true,
      message: "Status Changed",
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const adminDeleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    console.log("updateObj", body, id);

    const updateObj = {
      isDeleted: body.isDeleted,
    };

    const response = await restaurantModel.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    console.log("response", response);
    res.json({
      status: true,
      message: "Deleted",
      data: response,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const adminAllVenors = async (req, res) => {
  try {
    const filter = {
      type: "vendor",
      isVerified: true,
    };
    const response = await userModel.find(filter);
    const ObjToSend = await Promise.all(
      response.map(async (vendor) => {
        const count = await restaurantModel.countDocuments({
          createBy: vendor._id,
        });
        return {
          ...vendor.toObject(),
          resCount: count,
        };
      })
    );
    res.json({
      status: true,
      message: "vendor got",
      data: ObjToSend,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await userModel.find({});
    console.log(response);

    const ObjToSend = await Promise.all(
      response.map(async (user) => {
        const count = await OrderModel.countDocuments({
          createdBy: user._id,
        });
        return {
          ...user.toObject(),
          orderCount: count,
        };
      })
    );

    res.json({
      status: true,
      message: "All User Got",
      data: ObjToSend,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};
