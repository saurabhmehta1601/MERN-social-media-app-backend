import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer";

import { verifyToken } from "./src/middlewares/auth.js";

import register from "./src/controllers/auth/register.js";
import login from "./src/controllers/auth/login.js";
import getUserById from "./src/controllers/user/getUserById.js";
import getUserFriends from "./src/controllers/user/getUserFriends.js";
import addRemoveFriend from "./src/controllers/user/addRemoveFriend.js";
import createPost from "./src/controllers/post/createPost.js";
import likeOrDislikePost from "./src/controllers/post/likeOrDislikePost.js";
import getFeedPosts from "./src/controllers/post/getFeedPosts.js";
import getUserPosts from "./src/controllers/post/getUserPosts.js";
import getAllUsers from "./src/controllers/user/getAllUsers.js";
import followUserById from "./src/controllers/user/followUserById.js";
import unfollowUserById from "./src/controllers/user/unfollowUserById.js";

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
app.use(express.static(path.join(process.cwd(), "/public")));
app.use("/uploads", express.static("uploads"));

// SETUP DISKSTORAGE FOR IMAGE UPLOADS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// APP ROUTES WITH IMAGE UPLOADS

app.post("/auth/register", upload.single("profilePicture"), register);
app.post("/posts/create", verifyToken, upload.single("postImage"), createPost);

// APP ROUTES

app.post("/auth/login", login);
app.post("/follow", verifyToken, followUserById);
app.post("/unfollow", verifyToken, unfollowUserById);

app.get("/user/:id", verifyToken, getUserById);
app.get("/user/:id/friends", verifyToken, getUserFriends);
app.get("/allusers", verifyToken, getAllUsers);
app.get("/posts/feed", verifyToken, getFeedPosts);
app.get("/posts/:userId", verifyToken, getUserPosts);

app.patch(
  "/user/:id/addOrRemoveFriend/:friendId",
  verifyToken,
  addRemoveFriend
);
app.patch("/posts/toggleIsLiked", verifyToken, likeOrDislikePost);
app.patch("/posts/:id/comment", verifyToken, likeOrDislikePost);

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
