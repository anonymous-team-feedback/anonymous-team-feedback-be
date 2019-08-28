const express = require("express");
const home = require("../routes/home");
const error = require("../middleware/error");
const auth = require("../routes/auth");
const posts = require("../routes/posts");

module.exports = function(server) {
  server.use(express.json());
  server.use("/", home);
  server.use("/api/auth", auth);
  server.use("/api/posts", posts);

  // Middleware to handle errors, must be last in route list
  server.use(error);
};
