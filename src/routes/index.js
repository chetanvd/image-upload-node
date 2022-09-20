const express = require('express');
require("dotenv").config({ path: ".env" });

const allServices = express();

const imageRoute = require('./imageRoute');
const ResponseMiddleware = require('../middlewares/responseMiddleware');
const ErrorMiddleware = require('../middlewares/errorMiddleware');
const { getImageDir } = require('../utils/helper');

const response = new ResponseMiddleware();
const error = new ErrorMiddleware();

allServices.use(express.urlencoded({ extended: true }));
allServices.use('/images',express.static(getImageDir()));

allServices.use('/v1/images', imageRoute);

allServices.use(response.processResponse);
allServices.use(error.handle);

module.exports = allServices