import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      min: 3,
      max: 30,
      required: true,
    },
    description: {
      type: String,
      min: 6,
      max: 250,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorProfilePicture: String,
    postImage: String,

    likes: {
      type: Map, // MORE PERFORMANCE THAN ARRAY ( NOT HAVE TO SEARCH THROUGHT WHOLE ARRAY )
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
