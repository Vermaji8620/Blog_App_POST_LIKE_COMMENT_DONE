const Post = require("../models/postModel");
// const Like = require("../models/likeModel");
// const Comment = require("../models/commentModel");
exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();
    res.status(200).json({
      post: savedPost,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error while cerating post",
      message: err.message,
    });
  }
};

// need some more testing after completing like wala controller
exports.getAllposts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.json({
      posts,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error while getting post",
      message: err.message,
    });
  }
};
