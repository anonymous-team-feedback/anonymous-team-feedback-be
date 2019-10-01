const { validate } = require("../models/posts");
const post = require("../controllers/posts");
const user = require("../controllers/user");
const { User } = require("../models/users");
const { findTeamByUser } = require("../controllers/teams");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const posts = await post.findByColleagueId( req.user._id );
  res.status(200).json(posts);
});

router.get("/:id", async (req, res) => {
  const _post = await post.findPostById(req.params.id);
  if (!_post)
    return res.status(404).json({ message: "No post was found with that ID" });

  res.status(200).json(_post);
});

router.post("/", auth, async (req, res) => {
  // Check request body for missing items
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Look up colleague by e-mail
  const colleague = await user.findUserByEmail(req.body.colleague);
  if (!colleague)
    return res.status(400).json({ message: "No colleague was found" });

  const _post = await post.createPost({
    date: req.body.date,
    post: req.body.post,
    poster: req.body.poster,
    colleague: colleague._id
  });
  res.status(200).json(_post);
});

router.put("/:id", auth, async (req, res) => {
  // Check request body for missing items
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Look up colleague by e-mail
  const colleague = await user.findUserByEmail(req.body.colleague);
  if (!colleague)
    return res.status(400).json({ message: "No colleague was found" });

  const updatedPost = await post.updatePostById(
    req.params.id,
    { date: req.body.date, post: req.body.post, colleague: colleague._id }
  );

  if (!updatedPost)
    return res
      .status(400)
      .json({ message: "The post with the given ID was not found" });

  res.status(200).json(updatedPost);
});

router.delete("/:id", async (req, res) => {
  const _post = await post.deletePostById(req.params.id);
  if (!_post)
    return res.status(404).json({ message: "No post was found with that ID" });

  res.status(200).json(_post);
});

// Returns a list of e-mail addresses from the colleague field on the front end
router.post("/users", auth, async (req, res) => {
  const team = await findTeamByUser(req.user._id);
  // Create regular expression to run against the DB.
  const rgx = new RegExp(req.body.email, "ig");
  // Look for users matching expression
  const users = await User.find({
    email: rgx,
    _id: { $ne: req.user._id, $in: team.members }
  }).select("email -_id");
  if (!users) return res.status(400).json({ message: "No users were found" });

  res.status(200).json(users);
});
module.exports = router;
