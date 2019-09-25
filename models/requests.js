const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const requestSchema = mongoose.Schema({
  date: {
    type: String,
    default: Date.now,
    required: true
  },
  request: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  fufilled: {
    type: Number,
    required: true,
    default: 0
  },
  team: { 
    type: String,
    ref: "Team",
    required: true, 
  }
});

const Request = mongoose.model("Request", requestSchema);

function validateRequest(request) {
  const schema = {
    date: Joi.date().required(),
    request: Joi.string()
      .min(5)
      .max(255)
      .required(),
    requester: Joi.objectId().required(),
    fufilled: Joi.number().required()
  };
  return Joi.validate(request, schema);
}
exports.Request = Request;
exports.validate = validateRequest;
