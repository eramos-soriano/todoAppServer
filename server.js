// Server file (serverside)
import { app } from "./app.js";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";

// get access to enviroment variables through .env file
config({
    path: "./config/config.env",
});
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
connectDatabase();

// set enviroment variable PORT to listen to port 4000
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});