const Joi = require("joi");
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
  const manager = await checkIfManager(req.user_id);
  if (!manager) {
      res.status(401).json({message: 'You are unauthorized'})
  }
  if (req.body.approved) {
    const result = await updateTeamMembers(req.body)
  }

});

function validate(teamData) {
  const schema = {
    slug: Joi.string().required()
  };
  return Joi.validate(teamData, schema);
}

module.exports = router;
