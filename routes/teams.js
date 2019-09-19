/* eslint-disable no-undef */
const Joi = require("joi");
const {
  createTeam,
  getTeam,
  updateTeamById,
  findTeamById,
  deleteTeamByid
} = require("../controllers/teams");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const team = await getTeam(req.user._id);
  res.status(200).json(team);
});

router.get("/:id", async (req, res) => {
  const team = await findTeamById(req.params.id);
  if (!team) {
    res.status(400).json({ message: "No team found with provided id" });
  }
  res.status(200).json(team);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const team = await createTeam(req.body, req.user._id);
  await team.save();
  res.status(201).json(team);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let team = await findTeamById(req.params.id);
  if (!team) {
    res.status(400).json({ message: "No team found with provided id" });
  }
  team = await updateTeamById(req.params.id, { name: req.body.name });

  res.status(200).json(team);
});

router.delete("/:id", auth, async (req, res) => {
  const team = await deleteTeamByid(req.params.id)
  if (!team) {
    res.status(400).json({ message: "No team found with provided id" });
  }
  res.status(200).json(team);
})

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
