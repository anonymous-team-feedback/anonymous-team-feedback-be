const express = require('express');
const home = require('../routes/home');
const error = require('../middleware/error');

module.exports = function(server) {
  server.use(express.json());
  server.use('/', home);

  // Middleware to handle errors, must be last in route list
  server.use(error);
};
