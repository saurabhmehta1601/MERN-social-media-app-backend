import Post from "../../models/Post.js";

const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    console.log({ posts });
    const responseData = posts.map((post) => ({
      ...post._doc,
      liked: post.likes.has(req.userId),
    }));
    console.log({ responseData });
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default getFeedPosts;
