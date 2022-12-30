import Post from "../../models/Post.js";

const likeOrDislikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const postInDB = await Post.findById(id);

        const isLiked = postInDB.likes.get(userId);

        if (isLiked) {
            postInDB.likes.delete(userId);
        } else {
            postInDB.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: postInDB.likes },
            { new: true }
        );

        return res.status(204).json(updatedPost);
        
    } catch (error) {
        
    }
};

export default likeOrDislikePost;
