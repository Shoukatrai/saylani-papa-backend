import express from "express";
import { createRes, deleteMenu, deleteVendorRes, editMenu, fetchAllMenu, getVendorRes, selectRestaurantGet, vendorCreateMenu, vendorResStatus, vendorUpdateStatus } from "../controllers/restaurant.js";
import { checkAuth } from "../middlewares/auth.js";
const resRouter = express.Router();

resRouter.post("/create-restaurant", checkAuth, createRes);
resRouter.get("/vendor-restaurant", checkAuth, getVendorRes);
resRouter.delete("/vendor-restaurant/:id", checkAuth, deleteVendorRes);
resRouter.put("/vendor-restaurant-update/:id", checkAuth, vendorUpdateStatus);
resRouter.patch("/vendor-restaurant-status/:id", checkAuth, vendorResStatus);
resRouter.post("/create-menu", checkAuth, vendorCreateMenu);
resRouter.get("/select-restaurant", checkAuth, selectRestaurantGet);
resRouter.get("/menu-listing", checkAuth, fetchAllMenu);
resRouter.put("/menu-edit/:id", checkAuth, editMenu);
resRouter.delete("/menu-delete/:id", checkAuth, deleteMenu);

export default resRouter;
