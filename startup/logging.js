const winston = require('winston');
require('winston-mongo');

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/anonteamfeedback';

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'errors.log' })
  );

  process.on('unhandledRejection', err => {
    throw err;
  });
  const files = new winston.transports.File({
    filename: 'logfile.log',
    level: 'info'
  });
  const console = new winston.transports.Console();
  const errors = new winston.transports.File({
    filename: 'errors.log',
    level: 'error'
  });

  winston.add(files);
  winston.add(console);
  winston.add(errors);
};
