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
    console.log("request body", req.body);
    console.log("salt", salt);
    console.log("password", password);
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

    const savedUser = await newUser.save();
    const registeredUser = {
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
    };

    res.status(201).json({
      message: "User created successfully",
      createdUser: registeredUser,
    });
  } catch (err) {
    console.log("Error adding new user to mongodb", err);
    res.status(500).json({ message: err.message, createdUser: null });
  }
};

export default register;
