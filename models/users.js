// Used for Users schema
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 2,
    maxlenght: 50
  },
  email: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlenght: 5,
    maxlenght: 1024
  }
});

// Method for generating the token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
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
      .required()
  };
  return Joi.validate(user, schema);
}

// Export User model and validation function
exports.User = User;
exports.validate = validateUser;
