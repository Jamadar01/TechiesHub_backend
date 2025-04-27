import Post from "../mongooseModels/Post.js";

export const createPost = async (req, res) => {
  const content  = req.body.content;
  const postedBy=req.userId
  console.log("req.userId",postedBy)
  const image = req.file ? req.file.filename : null;

  try {
    const newPost = new Post({ postedBy, content, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('postedBy', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unlikePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findById(postId);
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { postId, text, userId } = req.body;
  try {
    const post = await Post.findById(postId);
    post.comments.push({ text, postedBy: userId });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find({ postedBy: userId }).populate('postedBy', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



