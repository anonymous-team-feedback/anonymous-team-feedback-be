const { JoinTeam } = require("../models/joinTeams");
const { Team } = require("../models/teams");

async function requestJoinTeam(requestData) {
  const request = new JoinTeam(requestData);

  return await request.save();
}

async function getTeamIdBySlug(slug) {
  const teamId = await Team.findOne({ slug: slug });
  return teamId._id;
}

async function checkIfManager(managerId) {
    return await Team.findOne({ manager: managerId})
}

// async function updateTeamMembers(teamInfo) {
    
// }

module.exports = {
  requestJoinTeam,
  getTeamIdBySlug,
  checkIfManager,
  updateTeamMembers
};
