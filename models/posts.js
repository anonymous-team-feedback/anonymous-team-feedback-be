const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const postSchema = mongoose.Schema({
  date: {
    type: String,
    default: Date.now,
    required: true
  },
  post: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
  const schema = {
    date: Joi.date().required(),
    post: Joi.string()
      .min(5)
      .max(255)
      .requred(),
    poster: Joi.objectId().required(),
    targetUser: Joi.objectId()
  };
  return Joi.validate(post, schema);
}
exports.Post = Post;
exports.validate = validatePost;