import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import SongRoutes from "./routers/songs.js";

const app = express();
config({ path: "./config/config.env" });

// CORS configuration
app.use(
  cors({
    origin: ['https://test-project-mu-six.vercel.app'], // Include all necessary origins
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/songs", SongRoutes);

dbConnection();
app.use(errorMiddleware);

export default app;
