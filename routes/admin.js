import express from "express";
import { adminAllVenors, adminDeleteRestaurant, approveRestaurant, getAllRestaurants, getAllUsers } from "../controllers/admin.js";
import { adminCheckAuth } from "../middlewares/auth.js";


const adminRouter = express.Router()



adminRouter.get("/all-restaurants" , adminCheckAuth, getAllRestaurants)
adminRouter.patch("/restaurant-approve/:id" , adminCheckAuth, approveRestaurant)
adminRouter.patch("/restaurant-delete/:id" , adminCheckAuth, adminDeleteRestaurant)
adminRouter.get("/all-vendors" , adminCheckAuth, adminAllVenors)
adminRouter.get("/all-users" , adminCheckAuth, getAllUsers)



export default adminRouter