import express from "express";

import { getAllOrder, updateOrderStatus } from "../controllers/order.js";
import { checkAuth } from "../middlewares/auth.js";

const orderRouter = express.Router()



orderRouter.get("/vendor-order" , checkAuth, getAllOrder)
orderRouter.patch("/vendor-order/:id" , checkAuth, updateOrderStatus)



export default orderRouter