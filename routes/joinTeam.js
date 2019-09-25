const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const {
  requestJoinTeam,
  getTeamIdBySlug,
  checkIfManager,
  updateTeamMembers
} = require("../controllers/joinTeam");

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");



router.post("/", auth, async (req, res) => {
  // make sure required info is in the request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Gets the team id from the provide slug
  const teamId = await getTeamIdBySlug(req.body.slug);
  if (!teamId) {
    res.status(400).json({ message: "No team found with that slug" });
  }
  // Creates new pending document in database
  const request = await requestJoinTeam({
    team: teamId,
    user: req.user._id,
    approved: false
  });

  res.status(201).json(request);
});

router.put("/", auth, async (req, res) => {
    const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const manager = await checkIfManager(req.user_id);
  if (!manager) {
    res.status(401).json({ message: "You are not the authorizing manager" });
  }
  
  if (req.body.approved === "false") {
    res.status(400).json({ message: "Not approved" });
  }
  const result = await updateTeamMembers(req.body);
  res.status(200).json(result);
});

function validate(teamData) {
  const schema = {
    slug: Joi.string().required()
  };
  return Joi.validate(teamData, schema);
}

function validateUpdate(teamData) {
    const schema = {
      slug: Joi.string().required(),
      approved: Joi.boolean().required(),
      user: Joi.objectId().required(),
    };
    return Joi.validate(teamData, schema);
  }

module.exports = router;
