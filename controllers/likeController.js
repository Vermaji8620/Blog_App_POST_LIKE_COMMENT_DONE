const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likepost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({
      post,
      user,
    });
    const savedLike = await like.save();
    // update the post collection on basis of this
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: savedLike._id },
      },
      { new: true }
    )
      .populate("likes")
      .populate("comments") //populate the comments array with the comment documents
      .exec();
    res.status(200).json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error while liking post",
      message: err.message,
    });
  }
};

exports.unlikepost = async (req, res) => {
  try {
    const { post, like } = req.body;
    // find and delete like collection me se
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    // update the post collection
    const updatedpost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: deletedLike._id },
      },
      { new: true }
    )
      .populate("likes")
      .populate("comments") //populate the comments array with the comment documents
      .exec();
    res.status(200).json({
      post: updatedpost,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Error while liking post",
      message: err.message,
    });
  }
};
