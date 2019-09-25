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
  approved: {
    type: Boolean,
    required: true,
    default: false
  }
});

const JoinTeam = mongoose.model("JoinTeam", joinTeamSchema);

exports.JoinTeam = JoinTeam;
