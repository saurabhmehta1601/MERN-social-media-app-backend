import User from "../../models/User.js";

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const UserInDB = await User.findById(id);
    return res.status(200).json(UserInDB);
  } catch (error) {
    console.log("error in getUserById", error);
    res.status(404).json({ message: error.message });
  }
};

export default getUserById;
