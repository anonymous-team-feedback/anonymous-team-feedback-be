const { Team } = require("../models/teams");

module.exports = {
  createTeam,
  getTeam,
  updateTeamById,
  findTeamById,
  deleteTeamByid
};

async function getTeam(managerId) {
  return await Team.find({ manager: managerId });
}

async function createTeam(teamInfo, managerId) {
  const team = new Team({
    name: teamInfo.name,
    manager: managerId
  });
  return await team.save();
}

async function findTeamById(teamId) {
  return await Team.findById(teamId);
}

async function updateTeamById(teamId, updateTeam) {
  return await Team.findByIdAndUpdate(teamId, updateTeam, { new: true });
}

async function deleteTeamByid(teamId) {
  return await Team.findByIdAndDelete(teamId);
}
