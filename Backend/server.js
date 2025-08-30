import express from "express";
import 'dotenv/config';
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 8080;  // ✅ use Render's PORT

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
