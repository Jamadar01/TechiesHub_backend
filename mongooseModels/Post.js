const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String }, // Optional image in the post
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
