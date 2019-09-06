const mongoose = require("mongoose");
const winston = require("winston");

const databaseUrl =
      process.env.MONGODB_URI || "mongodb://localhost/anonteamfeedback";
module.exports = function() {
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(databaseUrl, { useNewUrlParser: true })
    .then(() => winston.info("Connected to MongoDB"))
    .catch(err => winston.error("Unable to connect to database"));
};
