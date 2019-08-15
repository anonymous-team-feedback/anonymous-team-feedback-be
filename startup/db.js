const mongoose = require('mongoose')
const winston = require('winston')

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/anonteamfeedback'
module.exports = function() {
    mongoose.connect(databaseUrl,  { useNewUrlParser: true })
    .then(() => winston.info('Connected to MongoDB'))
    .catch(err => winston.error('Unable to connect to database'))
}