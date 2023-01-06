import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    console.log("REQUEST BODY ");
    console.table(req.body);
    const { email, password } = req.body;
    const userInDB = await User.findOne({ email });
    console.log("USER IN DB IS ", userInDB);

    if (!userInDB) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userInDB.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("password is matched");

    const token = jwt.sign(userInDB.id , process.env.JWT_SECRET);
    console.log("JWT token is ", token);
    return res.status(200).json({ user: userInDB, token });
  } catch (error) {
    return res.status(500).json({
      code: error.code,
      message: error.message,
    });
  }
};

export default login;
