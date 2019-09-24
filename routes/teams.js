/* eslint-disable no-undef */
const Joi = require("joi");
const {
  createTeam,
  getTeam,
  updateTeamBySlug,
  findTeamBySlug,
  deleteTeamBySlug
} = require("../controllers/teams");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const team = await getTeam(req.user._id);
  res.status(200).json(team);
});

router.get("/:slug", async (req, res) => {
  const team = await findTeamBySlug(req.params.slug);
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

router.put("/:slug", auth, async (req, res) => {
  const { error } = validateTeam(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let team = await findTeamBySlug(req.params.slug);
  if (!team) {
    res.status(400).json({ message: "No team found with provided slug" });
  }
  
  team = await updateTeamBySlug(req.params.slug, {
    slug: req.body.slug,
    name: req.body.name
  });

  res.status(200).json(team);
});

router.delete("/:slug", auth, async (req, res) => {
  const team = await deleteTeamBySlug({ slug: req.params.slug });
  if (!team) {
    res.status(400).json({ message: "No team found with provided slug" });
  }
  res.status(200).json(team);
});

function validateTeam(team) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    slug: Joi.string().required()
  };
  return Joi.validate(team, schema);
}

module.exports = router;
