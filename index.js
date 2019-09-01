require("dotenv").config();
const express = require("express");
const server = express();
const winston = require("winston");
const cors = require("cors");
const helmet = require("helmet");
const paginationUtils = require('./util/pagination.js');

exports.Pagination = paginationUtils


server.use(helmet());
server.use(cors());

require("./startup/logging")();
require("./startup/routes")(server);
require("./startup/db")();

module.exports = server;

const port = process.env.PORT || 5050;
server.listen(port, () => winston.info(`Listening on port ${port}`));
