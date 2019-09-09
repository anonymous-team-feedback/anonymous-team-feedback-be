const { Post } = require("../models/posts");


async function findPostById (postId) {
  return await Post.findOne({ _id: postId });
}

async function findByColleagueId (colleagueId) {
  return await Post.find({ colleague: colleagueId }).select(
    "post date"
  );
}

async function createPost (postData) {
  const post = new Post(postData);

  return await post.save();
}

async function updatePostById (postId, updatePairs) {
  return await Post.findByIdAndUpdate(postId, updatePairs, { new: true });
}

async function deletePostById (postId) {
  return await Post.findOneAndRemove({ postId });
}

module.exports = {
  findPostById,
  findByColleagueId,
  updatePostById,
  deletePostById,
  createPost
};
