const express = require('express');
const home = require('../routes/home');
const error = require('../middleware/error');
const auth = require('../routes/auth')

module.exports = function(server) {
  server.use(express.json());
  server.use('/', home);
  server.use('/api/auth', auth )

  // Middleware to handle errors, must be last in route list
  server.use(error);
};
