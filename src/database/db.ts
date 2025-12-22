import mongoose from "mongoose";
import { envConfig } from "../config/config.js";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected");
        })
        await mongoose.connect(envConfig.DB_URL as string);
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export default connectDB