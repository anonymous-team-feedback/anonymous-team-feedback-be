const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  // Validates request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checks if user is already in the database
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).json({ message: "User is already registered" });

  // Create new user
  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
  });
  // Create salt and hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // Create token
  const token = user.generateAuthToken();

  // Send response and token
  res.header("x-auth-token", token).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id
  });
});

router.post("/login", async (req, res) => {
  // Validates request body
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Locate user in database
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  // Check if password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password" });

  // Create token
  const token = user.generateAuthToken();

  // Send response and token
  res.header("x-auth-token", token).json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id
  });
});

function validateLogin(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;