const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const joinTeamSchema = mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Team"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pending: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Join = mongoose.model("Join", joinTeamSchema);

function validateJoin(teamData) {
  const schema = {
    team: Joi.objectId().required(),
    user: Joi.objectId().required(),
    pending: Joi.boolean()
  };
  return Joi.validate(teamData, schema);
}
exports.Join = Join;
exports.validate = validateJoin;
