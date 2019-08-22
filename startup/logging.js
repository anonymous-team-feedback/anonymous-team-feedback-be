const winston = require("winston");
require("winston-mongo");
require("express-async-errors");

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "./logs/errors.log" })
  );

  process.on("unhandledRejection", err => {
    throw err;
  });
  const files = new winston.transports.File({
    filename: "./logs/logfile.log",
    level: "info"
  });
  const console = new winston.transports.Console();
  const errors = new winston.transports.File({
    filename: "./logs/errors.log",
    level: "error"
  });

  winston.add(files);
  winston.add(console);
  winston.add(errors);
};
