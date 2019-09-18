const mongoose = require("mongoose");

const teamsSchema = mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
    trim: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ]
});

exports.Team = mongoose.model("Team", teamsSchema);
