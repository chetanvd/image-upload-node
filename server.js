const express = require('express');
require("dotenv").config({ path: ".env" });

const allServices = express();

const logger = require('./src/logger/logger');
const imageRoute = require('./src/routes/imageRoute');
const ResponseMiddleware = require('./src/middlewares/responseMiddleware');
const ErrorMiddleware = require('./src/middlewares/errorMiddleware');

const response = new ResponseMiddleware();
const error = new ErrorMiddleware();

allServices.use(express.urlencoded({ extended: true }));
allServices.use('/images',express.static(__dirname+'/src/uploads'));

allServices.use('/v1/images', imageRoute);

allServices.use(response.processResponse);
allServices.use(error.handle);

allServices.listen(process.env.PORT, () => {
    logger.info(`Backend Service is Running on PORT : ${process.env.PORT}`);
});
