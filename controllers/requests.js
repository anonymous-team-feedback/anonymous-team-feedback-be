const { Request } = require("../models/requests.js");

async function findRequestById(requestId) {
  return await Request.findOne({ _id: requestId });
}

async function findByRequesterId(requesterId) {
  return await Post.find({ requester: requesterId }).select("request date");
}

async function findByTeam(team) {
  return await Post.find({ team }).select("request date");
}

async function createRequest(requestData) {
  const request = new Request(requestData);
  return await request.save();
}

async function updateRequestById(requestId, updatePairs) {
  return await Request.findByIdAndUpdate(requestId, updatePairs, { new: true });
}

async function deleteRequestById(requestId) {
  return await Post.findOneAndRemove({ requestId });
}

module.exports = {
  findRequestById,
  findByRequesterId,
  findByTeam,
  updateRequestById,
  deleteRequestById,
  createRequest
};
