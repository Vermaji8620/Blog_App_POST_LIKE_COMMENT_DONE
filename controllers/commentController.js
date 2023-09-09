// import the model
const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req, res) => {
  try {
    // we will use save() function this time for creation into the database
    // fetch the data from body request
    const { post, user, body } = req.body;
    const comment = new Comment({ post, user, body });
    // now store the created object into the db
    const savedComment = await comment.save();

    // find the post by id , add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("likes")
      .populate("comments") //populate the comments array with the comment documents
      .exec();

    res.status(200).json({
      post: updatedPost,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
