const { validate } = require("../models/requests");
const requests = require("../controllers/requests");
const teams  = require("../controllers/teams");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const requests = await post.findByRequesterId(req.user._id);
  res.status(200).json(posts);
});

router.get("/:id", auth, async (req, res) => {
  const request = await Requests.findRequestById(req.params.id);
  if (!request)
    return res
      .status(404)
      .json({ message: "No request was found with that ID" });

  res.status(200).json(request);
});

router.get("/:team", auth, async (req, res) => {
  const requests = await requests.findByTeam(req.paramas.team);
  if (!requests) {
    return res
      .status(404)
      .json({ message: "No requests were found for that team" });
  }
  res.status(200).json(request);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);;

  const request = await Requests.createRequest({
    date: req.body.date,
    request: req.body.request,
    requester: req.user._id,
    team: teams.findTeamByUserId(req.user._id)
  });
  res.status(200).json(request);
});


module.exports = router;
