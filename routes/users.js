const { User } = require("../models/users");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const rgx = new RegExp(req.body.email, "ig");
  const users = await User.find({
    email: rgx
  }).select("email -_id");

  res.status(200).json(users);
});

module.exports = router;
