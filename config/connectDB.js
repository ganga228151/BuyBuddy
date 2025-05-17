import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGODB_URI);

        if (!connected) {
            console.log("mongodb is not connected");
        }
        console.log("mongo db connected")
    } catch (error) {
        console.log("mongodb connection error");
        console.log(error)
    }
}