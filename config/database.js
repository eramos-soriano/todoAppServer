import mongoose from "mongoose";

// connect to mongodb uri (localhost)
// Try...catch: try is executed first. If it throws an exeption,
// the code in catch will be executed.
export const connectDatabase = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};