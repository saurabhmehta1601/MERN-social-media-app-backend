import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    console.log("request body ", req.body);
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    const userInDB = await User.findOne({ email });
    console.log("USER IN DB", userInDB);

    if (!userInDB) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userInDB.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const loggedUser = {
      firstName: userInDB.firstName,
      lastName: userInDB.lastName,
      email: userInDB.email,
    };

    const token = jwt.sign({ id: userInDB._id }, process.env.JWT_SECRET, {});
    res
      .status(200)
      .json({ message: "Login Successful", loggedInUser: userInDB, token });
  } catch (error) {
    console.log("Error logging in", error);
  }
};

export default login;
