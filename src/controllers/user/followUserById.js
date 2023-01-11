import User from "../../models/User.js";

const followUserById = (req, res) => {
  try {
    const { followingId } = req.body;
    const authencatedUser = User.findOne(req.userId);
    authencatedUser.following.set(followingId, true);
    authencatedUser.save();
    return res.status(204).json({ ...authencatedUser, followingId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default followUserById;
