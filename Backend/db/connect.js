// db.js (or in your main file)
import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mygpt", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
