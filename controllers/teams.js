const { Team } = require("../models/teams");

module.exports = {
  createTeam,
  getTeam,
  updateTeamBySlug,
  findTeamByUserId,
  findTeamBySlug,
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

async function findTeamByUserId(userId) {
  return await Team.findOne({ members: { _id: userId } });
}

async function findTeamBySlug(slug) {
  return await Team.findOne({ slug });
}

async function updateTeamBySlug(slug, updateTeam) {
  return await Team.findOneAndUpdate(slug, updateTeam, { new: true });
}

async function deleteTeamBySlug(teamSlug) {
  return await Team.findOneAndDelete(teamSlug);
}
