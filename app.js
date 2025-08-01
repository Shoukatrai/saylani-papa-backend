import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import authRouter from "./routes/auth.js";
import resRouter from "./routes/restaurant.js";
import { dbConnection } from "./config/db.js";
import imageRouter from "./routes/uploadImage.js";
import { cloudinaryConfig } from "./config/cloudinary.js";
import adminRouter from "./routes/admin.js";
import clientRouter from "./routes/clientRouter.js";
import orderRouter from "./routes/order.js";
import cron from "node-cron"
import { deleteJob } from "./utils/otpDelete.js";
import { sendMarketingEmailJob } from "./utils/marketingEmail.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()) //body parser
app.use(express.urlencoded({ extended: true }))


app.use("/api/auth", authRouter)
app.use("/api/restaurant", resRouter)
app.use("/api/menu", resRouter)
app.use("/api/image", imageRouter)
app.use("/api/admin", adminRouter)
app.use("/api/client", clientRouter)
app.use("/api/order", orderRouter)



// delete used otp after 24 hr
// cron.schedule('0 0 * * *', deleteJob);

// delete marketing emails to all verified users
// cron.schedule('0 0 * * *', sendMarketingEmailJob);


app.get("/" , (req , res)=>res.send("SERVER UP"))

try {
  await dbConnection();
  console.log("DB connected");
} catch (err) {
  console.error("DB connection failed", err);
}
console.log("after DB connection")
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
}

// Vercel deployment
export default app