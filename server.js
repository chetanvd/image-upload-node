const logger = require('./src/logger/logger');
const server = require('./src/routes/index')

server.listen(process.env.PORT, () => {
    logger.info(`Backend Service is Running on PORT : ${process.env.PORT}`);
});