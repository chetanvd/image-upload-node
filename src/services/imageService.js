const fs = require('fs');
const BaseService = require('./baseService');
const imageModel = require('../db/models/imageUploadModel');
const logger = require('../logger/logger');
const DBClient = require('../db/dbClient');
const dbClient = new DBClient();

class ImageService extends BaseService {
    async upload(inputData) {
        try {
            const response = await dbClient.setDoc(imageModel, inputData);
            return response;
        } catch (exe) {
            logger.error(exe + '');
            throw 'Failed to Upload an Image.';
        }
    }

    async get(inputData) {
        try {
            let response = [],
                filter;
            const size = parseInt(inputData.size);
            const batch = parseInt(inputData.batch);
            const start = batch * size;
            const end = start + size;

            if (inputData.file_name) {
                filter = { file_name: inputData.file_name };
            } else {
                filter = {
                    uploaded_time: {
                        $gte: inputData.from_date,
                        $lt: inputData.to_date,
                    },
                };
            }

            let result = await dbClient.getDoc(imageModel, filter);

            if (result.length < start - size) {
                result = [];
            } else if (result.length < end) {
                result = result.slice(start);
            } else {
                result = result.slice(start, end);
            }

            for (let element of result) {
                response.push({
                    file_name: element.file_name,
                    url: `${process.env.BASE_URL}/images/${element.file_name}`,
                });
            }
            return response;
        } catch (exe) {
            logger.error(exe + '');
            throw 'Failed to Get Images.';
        }
    }
}

module.exports = ImageService;
