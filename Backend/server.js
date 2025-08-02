import express from "express";
import 'dotenv/config';
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        console.log("connected with MongoDB");
    }
};



app.listen(PORT, () => {
    console.log(`server is running on: ${PORT}`);
    connectDB();
});


