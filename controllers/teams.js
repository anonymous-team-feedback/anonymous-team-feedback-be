const { Team } = require("../models/teams");

module.exports = {
  createTeam,
  getTeam,
  updateTeamBySlug,
  findTeamBySlug,
  findTeamByUser,
  deleteTeamBySlug,
  findTeamMembers
};

async function getTeam(managerId) {
  return await Team.find({ manager: managerId });
}

async function createTeam(teamInfo, managerId) {
  const team = new Team({
    name: teamInfo.name,
    manager: managerId,
    slug: teamInfo.slug,
    members: [ managerId ]
  });
  return await team.save();
}

async function findTeamBySlug(slug) {
  return await Team.findOne({slug})
}
async function findTeamMembers(slug) {
  return await Team.findOne({slug}).populate(
    "user",
    "email firstName lastName jobTitle"
  );
}

async function findTeamByUser(userId) {
  return await Team.findOne({ members: userId });
}

async function updateTeamBySlug(slug, updateTeam) {
  return await Team.findOneAndUpdate(slug, updateTeam, { new: true });
}

async function deleteTeamBySlug(teamSlug) {
  return await Team.findOneAndDelete(teamSlug)
}
