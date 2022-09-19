const mongoose = require('mongoose');
const logger = require('../logger/logger');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on('connected', function () {
    logger.info('Connected to DB.');
});

conn.on('disconnected', function () {
    logger.warn('Disconnected from DB.');
});

conn.on('error', function () {
    logger.error('DB connection error.')
})

module.exports = conn;
