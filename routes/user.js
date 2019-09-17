const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const user = require("../controllers/user");
const { User } = require("../models/users");
const bcrypt = require("bcryptjs");

router.put("/:id", auth, async (req, res) => {
  const updatedUser = user.findByIdAndUpdate(req.params.id, req.body);

  res.status(201).json(updatedUser);
})

module.exports = router;