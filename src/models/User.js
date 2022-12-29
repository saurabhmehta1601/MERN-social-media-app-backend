import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      min: 5,
      max: 50,
    },
    passwordHash: {
      type: String,
      required: true,
      min: 5,
      max: 255,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      min: 3,
      max: 75,
      default: "",
    },
    occupation: {
      type: String,
      min: 3,
      max: 30,
      default: "",
    },
    profileViews: {
      type: Number,
      default: 0,
    },
    impressions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
