/* eslint-disable no-undef */
const Joi = require("joi");
const { Team } = require("../models/teams");
const { createTeam } = require("../controllers/teams")
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const team = Team.find();
  res.status(200).json(team);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const team = await createTeam(req.body, req.user._id) 
  await team.save();
  res.status(201).json(team);
});

function validateTeam(team) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
  };
  return Joi.validate(team, schema);
}

module.exports = router;
