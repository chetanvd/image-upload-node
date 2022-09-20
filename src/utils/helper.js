const Validator = require('jsonschema').Validator;
const fs = require('fs');
const path = require('path');
const gm = require('gm');
const logger = require('../logger/logger');

const validateSchema = (event, schema) => {
    const validator = new Validator();
    const result = validator.validate(event, schema);
    if (!result.valid) {
        return false;
    } else {
        return true;
    }
};

function getImageDir() {
    let currentDir = __dirname;
    while (!fs.existsSync(path.join(currentDir, 'uploads'))) {
        currentDir = path.join(currentDir, '..');
    }
    return path.join(currentDir, 'uploads');
}

function getEpochTime(fromDate, toDate) {
    const f_date =
        fromDate.split('-').reverse().join('-') + 'T00:00:01.000+00:00';
    const t_date =
        toDate.split('-').reverse().join('-') + 'T23:59:59.000+00:00';

    return {
        from_date: new Date(f_date).getTime(),
        to_date: new Date(t_date).getTime(),
    };
}

function createImageThumbnail(fileDetails) {
    return new Promise((resolve, reject) => {
        gm(fileDetails.file.path)
            .resize(100, 100)
            .write(
                `${fileDetails.file.destination}/${
                    fileDetails.file.filename.split('.')[0]
                }_thumbnail.jpg`,
                function (err) {
                    if (err) {
                        logger.error(err + '');
                        return reject({
                            error: 'Internal Server Error',
                            status: STATUS_CODES.internal_server_error,
                        });
                    }
                    logger.info('Created Thumbnail image.');
                    return resolve('Created Thumbnail image.');
                }
            );
    });
}

module.exports = {
    validateSchema,
    getImageDir,
    getEpochTime,
    createImageThumbnail,
};
