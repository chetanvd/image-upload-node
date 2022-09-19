const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const ImageController = require('../controllers/imageController');
const { getImageDir } = require('../utils/helper');
const imageController = new ImageController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, getImageDir());
    },
    filename: function (req, file, cb) {
        let f_name = file.originalname.split('.');
        req.body = {
            file_name:
                f_name[0].replace(/\s+/g, '_') +
                '_' +
                Date.now() +
                '.' +
                f_name[1],
        };
        cb(null, req.body.file_name);
    },
});

let upload = multer({ storage: storage });

router.post('/upload', upload.single('image_file'), imageController.upload);
router.get('/search/:batch/:size', imageController.get);

module.exports = router;
