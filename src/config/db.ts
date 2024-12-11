import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.DB_URI;
    if (!uri) {
      throw new Error("DB_URI is not defined");
    }
    mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
