const { Team } = require("../models/teams");

module.exports = {
  createTeam
};

async function createTeam(teamInfo, managerId) {
  console.log(teamInfo, managerId);
  const team = new Team({
    name: teamInfo.name,
    manager: managerId
  });
  await team.save();
  return team;
}
