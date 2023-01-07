import User from "../../models/User.js";

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userInDB = await User.findById(userId);
    const newPost = new Post({
      title,
      description,
      postImage: req.file.filename,
      authorId: userInDB.id,
      authorName: userInDB.firstName + " " + userInDB.lastName,
      authorProfilePicture: userInDB.profilePicture,
      likes: {},
      comments: [],
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export default createPost;
