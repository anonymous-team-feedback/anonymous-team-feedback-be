const { User } = require('../models/users');

async function createUser(userData) {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    email: userData.email
  });

  return await user.save();
}

async function deleteUser(userId) {
  return await User.findOneAndRemove({ _id: userId });
}

async function findUserByEmail(userEmail) {
  return await User.findOne({ email: userEmail });
}

module.exports = {
  findUserByEmail,
  createUser,
  deleteUser
};
