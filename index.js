require('dotenv').config();
const express = require('express');
const server = express();
const winston = require('winston');
const cors = require('cors')
const helmet = require('helmet')

server.use(helmet())
server.use(cors())

require('express-async-errors');
require('./startup/logging')()
require('./startup/routes')(server);
require('./startup/db')();

const port = process.env.PORT || 5050;
server.listen(port, () => winston.info(`Lisining on port ${port}`));
