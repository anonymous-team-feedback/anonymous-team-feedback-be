const express = require("express");
const home = require("../routes/home");
const error = require("../middleware/error");
const auth = require("../routes/auth");
const user = require("../routes/user");
const posts = require("../routes/posts");
const teams = require("../routes/teams");
const joinTeam = require("../routes/joinTeam");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger");

module.exports = function(server) {
  server.use(express.json());
  server.use("/", home);
  server.use("/api/auth", auth);
  server.use("/api/user", user);
  server.use("/api/posts", posts);
  server.use("/api/teams", teams);
  server.use("/api/jointeam", joinTeam);
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Middleware to handle errors, must be last in route list
  server.use(error);
};
