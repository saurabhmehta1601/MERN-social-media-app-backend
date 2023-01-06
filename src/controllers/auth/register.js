import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// Register a new user
const register = async (req, res) => {
  try {
    console.log("request body is ");
    console.table(req.body);

    const {
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      profilePicture,
      friends,
      location,
      occupation,
      profileViews: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 1000),
    });

    const registeredUserInDB = await newUser.save();
    const token = jwt.sign(registeredUserInDB.id, process.env.JWT_SECRET);

    return res.status(201).json({ token, user: registeredUserInDB });
  } catch (err) {
    return res
      .status(500)
      .json({ code: err.code, message: err.message, user : null });
  }
};

export default register;
