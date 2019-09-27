const { Team } = require("../models/teams");

module.exports = {
  createTeam,
  getTeam,
  updateTeamBySlug,
  findTeamBySlug,
  findTeamByUser,
  deleteTeamBySlug
};

async function getTeam(managerId) {
  return await Team.find({ manager: managerId });
}

async function createTeam(teamInfo, managerId) {
  const team = new Team({
    name: teamInfo.name,
    manager: managerId,
    slug: teamInfo.slug
  });
  return await team.save();
}

async function findTeamBySlug(slug) {
  return await Team.findOne({slug})
}

async function findTeamByUser(userId) {
  const team = await Team.find({ members: userId });
  if (!team) {
    team = await Team.find({ manager: userId });
  }
  return team;
}

async function updateTeamBySlug(slug, updateTeam) {
  return await Team.findOneAndUpdate(slug, updateTeam, { new: true });
}

async function deleteTeamBySlug(teamSlug) {
  return await Team.findOneAndDelete(teamSlug)
}
