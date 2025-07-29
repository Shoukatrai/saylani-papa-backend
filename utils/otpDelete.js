import { otpModel } from "../models/otpSchema.js"
export const deleteJob = async () => {
  try {
    const result = await otpModel.deleteMany({ isUsed: true });
    console.log("Deleted documents count:", result.deletedCount);
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
};
