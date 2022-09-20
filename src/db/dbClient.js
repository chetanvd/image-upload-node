const logger = require('../logger/logger');

class DBClient {
    getDoc(model, filter) {
        return new Promise((resolve, reject) => {
            if (filter) {
                model.find(filter, async function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } else {
                model.find({}, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            }
        });
    }

    setDoc(model, data) {
        return new Promise((resolve, reject) => {
            model.create(data, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    logger.info('Image uploaded successfully.');
                    return resolve({
                        status: true,
                        message: `Successfully Uploaded the Image with name : ${data.file_name}.`,
                    });
                }
            });
        });
    }
}

module.exports = DBClient;
