const express = require("express");
const { createComment } = require("../controllers/commentController");
const { createPost, getAllposts } = require("../controllers/postController");
const { likepost, unlikepost } = require("../controllers/likeController");
const router = express.Router();

router.post("/comments", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllposts);
router.post("/likes/like", likepost);
router.post("/likes/unlike", unlikepost);
module.exports = router;
