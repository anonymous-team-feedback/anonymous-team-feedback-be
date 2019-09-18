const { User } = require('../models/users');

async function createUser(userData) {
  const user = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password,
    email: userData.email,
    jobTitle: userData.jobTitle
  });

  return await user.save();
}

async function deleteUser(userId) {
  return await User.findOneAndRemove({ _id: userId });
}

async function findUserByEmail(userEmail) {
  return await User.findOne({ email: userEmail });
}

async function findUserAndUpdate(user_id, data) {
  return await User.findByIdAndUpdate(user_id, data, { new: true });
}

async function findUsers(email, userId) {
  const rgx = new RegExp(email, "ig");

  return await User.find({
    email: rgx,
    _id: { $ne: userId }
  }).select("email -_id");
}

module.exports = {
  findUserByEmail,
  createUser,
  deleteUser,
  findUserAndUpdate,
  findUsers
};
