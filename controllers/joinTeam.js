const  {JoinTeam}  = require("../models/joinTeams");
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
  return await Team.find({ manager: managerId });
}

async function updateTeamMembers(teamInfo) {
  const team = await Team.findOneAndUpdate(
    { slug: teamInfo.slug },
    { $push: { members: teamInfo.user } }
  );
  return await team;
}

async function getPendingRequest(slug) {
    const teamId = await getTeamIdBySlug(slug)
    const team = await JoinTeam.find({team: teamId}).populate('user', 'email firstName lastName')
    return team

}


module.exports = {
  requestJoinTeam,
  getTeamIdBySlug,
  checkIfManager,
  updateTeamMembers,
  getPendingRequest,
};
