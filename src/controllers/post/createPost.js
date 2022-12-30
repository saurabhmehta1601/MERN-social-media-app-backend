import User from "../../models/User.js";

const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const userInDB = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: userInDB.firstName,
      lastName: userInDB.lastName,
      location: userInDB.location,
      description,
      userPicture: userInDB.profilePicture,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    return res
      .status(201)
      .json({ message: "Post created successfully", newPost });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export default createPost;
