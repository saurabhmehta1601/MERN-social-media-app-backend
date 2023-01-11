import Post from "../../models/Post.js";

const likeOrDislikePost = async (req, res) => {
  try {
    const { postId } = req.body;

    const postInDB = await Post.findById(postId);
    if (!postInDB) return res.status(404).json({ message: "Post not found" });

    const isLiked = postInDB.likes.has(req.userId);
    if (isLiked) {
      postInDB.likes.delete(req.userId);
    } else {
      postInDB.likes.set(req.userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.userId,
      { likes: postInDB.likes },
      { new: true }
    );

    return res.status(204).json(updatedPost);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};

export default likeOrDislikePost;
