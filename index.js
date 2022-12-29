import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";

import register from "./src/controllers/auth/register.js";

// CONFIGURATIONS

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  "/assets",
  express.static(path.join(process.cwd(), "public", "assets"))
);

// SETUP DISKSTORAGE FOR IMAGE UPLOADS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// APP ROUTES WITH IMAGE UPLOADS

app.post("/auth/register", upload.single("profilePicture"), register);

// CONNECT TO MONGODB THEN RUN EXPRESS APP

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(">>> connected to mongodb");
    app.listen(PORT, () => {
      console.log(`>>> express app running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(">>> failed to connect to mongodb");
    console.log(err);
  });
