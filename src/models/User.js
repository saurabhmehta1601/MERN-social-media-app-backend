import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
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
    following: {
      type: Map,
      required: Boolean,
    },
    location: {
      type: String,
      min: 3,
      max: 20,
      default: "",
    },
    occupation: {
      type: String,
      min: 3,
      max: 20,
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
