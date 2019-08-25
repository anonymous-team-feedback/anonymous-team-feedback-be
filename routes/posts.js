const Joi = require("joi");
const { Post, validate } = require("../models/posts");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const posts = await Post.find({ poster: req.user._id });
  // Checks to see if the post is empty or not
  if (posts.length === 0)
    return res.status(200).json({ message: "No post were found " });

  res.status(200).json(posts);
});

module.exports = router;
