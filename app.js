// Application file (serverside)

// import express library
import express from "express";
import User from "./routers/User.js";
// cookie-parser middleware
import cookieParser from "cookie-parser";
// file upload
import fileUpload from "express-fileupload";
// cors
import cors from "cors";

// export app variable so other files can import it
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      useTempFiles: true,
    })
);
app.use(cors());

// hook in User router from routers/User.js
// add the path to recieve requests
app.use("/api/v1", User);
