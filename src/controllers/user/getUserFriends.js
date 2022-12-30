import User from "../../models/User.js";

User;
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const userInDB = await User.findById(id);

    const friends = await Promise.all(
      userInDB.friends.map(async (friend) => {
        const friendInDB = await User.findById(friend);
        return friendInDB;
      })
    );
    return res.status(200).json(friends);
  } catch (err) {
    console.log("error in fetching user friends", err);
    return res.status(404).json({ message: err.message });
  }
};

export default getUserFriends;
