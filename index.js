require("dotenv").config();
const express = require("express");
const server = express();
const winston = require("winston");
const cors = require("cors");
const helmet = require("helmet");

const corsOptions = {
  exposedHeaders: "X-Auth-Token"
};

server.use(helmet());
server.use(cors(corsOptions));

require("./startup/logging")();
require("./startup/routes")(server);
require("./startup/db")();

module.exports = server;

const port = process.env.PORT || 5050;
server.listen(port, () => winston.info(`Listening on port ${port}`));
