import bcrypt from "bcrypt";
import User from "../../models/User.js";

// Register a new user
const register = async (req, res) => {
  try {
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

    const registeredUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      registeredUser,
    });
  } catch (err) {
    console.log("Error adding new user to mongodb", err);
    return res.status(500).json({ message: err.message, registeredUser: null });
  }
};

export default register;
