const logger = require('../logger/logger');
const ImageService = require('../services/imageService');
const { STATUS_CODES } = require('../utils/constants');
const { getEpochTime, createImageThumbnail } = require('../utils/helper');

const imageService = new ImageService();

class AppsController {
    async upload(req, res, next) {
        logger.info('Received request to Upload Image.');
        try {
            let final_img_data = {
                file_name: req.body.file_name,
                uploaded_time: new Date().getTime(),
            };

            await createImageThumbnail(req);

            const UploadImageResponse = await imageService.upload(
                final_img_data
            );
            res.context = {};
            res.context.status = STATUS_CODES.ok;
            res.context.body = UploadImageResponse;
            return next();
        } catch (exe) {
            logger.error(exe + '');
            return next({
                error: 'Internal Server Error',
                status: STATUS_CODES.internal_server_error,
            });
        }
    }

    async get(req, res, next) {
        logger.info('Received request to Get Images.');
        let query = { ...req.params };
        if (req.query.file_name) {
            query.file_name = req.query.file_name;
        } else if (req.query.from_date && req.query.to_date) {
            const fDate = req.query.from_date.split('-');
            const tDate = req.query.to_date.split('-');

            if (
                fDate[0].length !== 2 ||
                fDate[1].length !== 2 ||
                fDate[2].length !== 4
            ) {
                return next({
                    error: 'from_date should be in DD-MM-YYYY format.',
                    status: STATUS_CODES.bad_request,
                });
            }

            if (
                tDate[0].length !== 2 ||
                tDate[1].length !== 2 ||
                tDate[2].length !== 4
            ) {
                return next({
                    error: 'to_date should be in DD-MM-YYYY format.',
                    status: STATUS_CODES.bad_request,
                });
            }
            query = {
                ...req.params,
                ...getEpochTime(req.query.from_date, req.query.to_date),
            };
        } else {
            return next({
                error: 'Please give either file_name or date range.',
                status: STATUS_CODES.bad_request,
            });
        }

        try {
            const GetImagesResponse = await imageService.get(query);
            res.context = {};
            res.context.status = STATUS_CODES.ok;
            res.context.body = GetImagesResponse;
            return next();
        } catch (exe) {
            logger.error(exe);
            return next({
                error: 'Internal Server Error',
                status: STATUS_CODES.internal_server_error,
            });
        }
    }
}

module.exports = AppsController;
