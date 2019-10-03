const { JoinTeam } = require("../models/joinTeams");
const { Team } = require("../models/teams");

async function requestJoinTeam(requestData) {
  const request = new JoinTeam(requestData);

  return await request.save();
}

async function getTeamIdBySlug(slug) {
  const teamId = await Team.findOne({ slug: slug });
  if (!teamId) {
    return null;
  } else {
    return teamId._id;
  }
}

async function checkIfManager(managerId) {
  return await Team.find({ manager: managerId });
}

async function removeRequest(userId) {
  const user = await JoinTeam.findOneAndRemove({ user: userId });
  return user;
}

async function updateTeamMembers(teamInfo) {
  const team = await Team.findOneAndUpdate(
    { slug: teamInfo.slug },
    { $push: { members: teamInfo.user } }
  );
  const user = await JoinTeam.findOneAndRemove({ user: teamInfo.user });
  return [team, user];
}

async function checkIfTeamMember(teamId, userId) {
  const team = await Team.findById({ _id: teamId }).find({members: userId});
  return team;
}

async function checkDuplicateRequest(teamId, userId) {
  const request = await JoinTeam.find({team: teamId, user: userId})
  return request
}

async function getPendingRequest(slug) {
  const teamId = await getTeamIdBySlug(slug);
  const team = await JoinTeam.find({ team: teamId }).populate(
    "user",
    "email firstName lastName jobTitle"
  );
  return team;
}

module.exports = {
  requestJoinTeam,
  getTeamIdBySlug,
  checkIfManager,
  updateTeamMembers,
  getPendingRequest,
  removeRequest,
  checkIfTeamMember,
  checkDuplicateRequest
};
