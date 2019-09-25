// Used for Users schema
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  jobTitle: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  team: { 
    type: String, 
    ref: "Team"
  }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    jobTitle: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

// Export User model and validation function
exports.User = User;
exports.validate = validateUser;
