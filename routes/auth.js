const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const user = require("../controllers/user");
const express = require("express");
const { validate } = require("../models/users.js");
const router = express.Router();
const joinTeam = require('../controllers/joinTeam')

router.post("/register", async (req, res) => {
  // Validates request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checks if user is already in the database
  let _user = await user.findUserByEmail(req.body.email);
  if (_user)
    return res.status(409).json({ message: "User is already registered" });

  // Create salt
  const salt = await bcrypt.genSalt(10);

  // Create new user
  _user = await user.createUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await bcrypt.hash(req.body.password, salt),
    email: req.body.email,
    jobTitle: req.body.jobTitle
  });

  // Send response and token
  res.json({
    firstName: _user.firstName,
    lastName: _user.lastName,
    email: _user.email,
    jobTitle: _user.jobTitle,
    _id: _user._id
  });
});

router.post("/login", async (req, res) => {
  // Validates request body
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Locate user in database
  let _user = await user.findUserByEmail(req.body.email);
  if (!_user)
    return res.status(400).json({ message: "Invalid email or password" });

  // Check if password is valid
  const validPassword = await bcrypt.compare(req.body.password, _user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid email or password" });

  // Create token
  const token = generateAuthToken(_user._id);

  let newUser = await user.findUser(_user._id) // find all data associated with this user from the given key from the findbyemail method
  let checked = await joinTeam.checkIfManager(_user._id)

  const fullUser = newUser[0]
  // Send response and token
  if(Object.keys(fullUser).length < 6){
    const {_id, firstName, lastName, email, jobTitle} = _user
    res.header("x-auth-token", token).json({
      _id,
      firstName,
      lastName,
      email,
      jobTitle,
      token,
      approved: false
    });
  }else {
    const {firstName, lastName, email, jobTitle, _id} = fullUser.user
    fullUser.approved ? 
    res.header("x-auth-token", token).json({...fullUser._doc,token, isManager: (checked.length>0)}) :
    res.header("x-auth-token", token).json({user: {
      firstName,
      lastName,
      email,
      jobTitle,
      _id,
      token: token,
      approved: fullUser.approved
    }});
  }
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


// Method for generating the token
function generateAuthToken (_id) {
  const token = jwt.sign({ _id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "2h"
  });
  return token;
};

module.exports = router;
