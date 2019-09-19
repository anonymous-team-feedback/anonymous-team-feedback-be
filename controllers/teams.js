const { Team } = require("../models/teams");

module.exports = {
  createTeam,
  getTeam
};

async function getTeam(managerId) {
    const team = await Team.find({manager: managerId})
    return team
}

async function createTeam(teamInfo, managerId) {
  console.log(teamInfo, managerId);
  const team = new Team({
    name: teamInfo.name,
    manager: managerId
  });
  await team.save();
  return team;
}
