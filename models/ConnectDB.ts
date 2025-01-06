import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectDb = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL environment variable is not defined");
        }
        const database = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB at ${database.connection.host}:${database.connection.port}`);
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
};

export default connectDb;


