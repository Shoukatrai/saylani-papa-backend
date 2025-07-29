import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.log("MongoDB error", err));
};
