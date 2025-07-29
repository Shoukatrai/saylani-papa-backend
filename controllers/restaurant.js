import { RestaurantMenuModel } from "../models/restaurantMenu.js";
import { restaurantModel } from "../models/restaurantSchema.js";

export const createRes = async (req, res) => {
  try {
    const body = req.body;

    const resObj = {
      ...body,
      createBy: req.user.id,
    };
    const response = await restaurantModel.create(resObj);
    console.log("RESTAURANT RESPONSE", response);
    // SUCCESS RES SEND
    res.json({
      message: "Restaurant Created successfully!",
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

export const getVendorRes = async (req, res) => {
  try {
    const response = await restaurantModel.find({
      createBy: req.user.id,
      isDeleted: false,
    });
    console.log("RESTAURANT RESPONSE", response);
    // SUCCESS RES SEND
    res.json({
      message: "VENDOR",
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

export const deleteVendorRes = async (req, res) => {
  try {
    const id = req.params.id;

    const updateObj = {
      isDeleted: true,
    };
    const response = await restaurantModel.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    console.log("RESTAURANT RESPONSE", response);
    // SUCCESS RES SEND
    res.json({
      message: "Restaurant Deleted",
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

export const vendorResStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const restaurant = await restaurantModel.findById(id);
    console.log("restaurant", restaurant);
    if (!restaurant?.isApproved) {
      return res.json({
        message:
          "Your Rastaurant is not Approved , wait for approval from the admin!",
        status: false,
        data: null,
      });
    }

    const response = await restaurantModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    console.log("RESTAURANT RESPONSE", response);

    res.json({
      message: "Restaurant Status Changed",
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

export const vendorUpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const response = await restaurantModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    console.log("RESTAURANT RESPONSE", response);

    res.json({
      message: "Restaurant Updated successfully",
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

export const vendorCreateMenu = async (req, res) => {
  try {
    const body = {
      ...req.body,
      createdBy: req.user.id,
    };
    const response = await RestaurantMenuModel.create(body);
    console.log(response);
    res.json({
      status: true,
      message: "Menu Created!",
      data: null,
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message,
      data: null,
    });
  }
};

export const selectRestaurantGet = async (req, res) => {
  try {
    const userId = req.user.id;
    const filter = {
      createBy: userId,
      isApproved: true,
      isDeleted: false,
    };
    console.log("userId", userId);
    const response = await restaurantModel.find(filter);
    res.json({
      status: true,
      message: "all res fetch!",
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

export const fetchAllMenu = async (req, res) => {
  try {
    const userId = req.user.id;
    const menuRes = await RestaurantMenuModel.find({ createdBy: userId });
    console.log("menuRes", menuRes);
    res.json({
      status: true,
      message: "all menu fetch",
      data: menuRes,
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message,
      data: null,
    });
  }
};

export const editMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log("body", body);
    console.log("id", id);
    const editRes = await RestaurantMenuModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    console.log("editRes", editRes);

    res.json({
      status: true,
      message: "Menu Updated",
      data: editRes,
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message,
      data: null,
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const editRes = await RestaurantMenuModel.findByIdAndDelete(id);

    console.log("editRes", editRes);

    res.json({
      status: true,
      message: "Menu Deleted",
      data: editRes,
    });
  } catch (error) {
    res.json({
      status: true,
      message: error.message,
      data: null,
    });
  }
};
