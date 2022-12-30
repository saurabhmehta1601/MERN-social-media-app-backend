import User from "../../models/User.js";

const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const userInDB = await User.findById(id);
    const friendInDB = await User.findById(friendId);

    if (userInDB.friends.includes(friendId)) {
      friendInDB.friends = friendInDB.friends.filter((friend) => friend !== id);
      userInDB.friends = userInDB.friends.filter(
        (friend) => friend !== friendId
      );
    } else {
      userInDB.friends.push(friendId);
      if (!friendInDB.friends.includes(id)) friendInDB.friends.push(id);
    }
    userInDB.save();
    friendInDB.save();

    return res.status(200).json({ message: "Friend added/removed" });
  } catch (err) {
    console.log("error in addRemoveFriend ", err);
    return res.status(500).message({ message: err.message });
  }
};

export default addRemoveFriend;
