const { Post, validate } = require("../models/posts");
const { User } = require("../models/users");
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

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post)
    return res.status(404).json({ message: "No post was found with that ID" });

  res.status(200).json(post);
});

router.post("/", auth, async (req, res) => {
  // Check request body for missing items
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Look up colleague by e-mail
  const colleague = await User.findOne({ email: req.body.colleague });
  if (!colleague)
    return res.status(400).json({ message: "No colleague was found" });

  // Create new post
  const post = new Post({
    date: req.body.date,
    post: req.body.post,
    poster: req.user._id,
    colleague: colleague._id
  });
  // Save post
  post.save();
  res.status(201).json(post);
});

router.delete("/:id", async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (!post)
    return res.status(404).json({ message: "No post was found with that ID" });

  res.status(200).json(post);
});

module.exports = router;