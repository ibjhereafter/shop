const express = require('express');
const fileType = require('file-type');
const multiparty = require('multiparty');
const fs = require('fs');
const AWS = require('aws-sdk');

const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const uploadFile = require('../utilities/s3Upload');
const cloudinary = require('../utilities/cloudinary');
const imagesRouter = express.Router();

imagesRouter.post('/upload', async (req, res) => {
    try {
        if (!req.body.image) {
            return res.status(200).json();
        }
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: 'shop',
            width: 200,
            crop: 'scale'
        });

        return res.status(200).json(result.secure_url);

    } catch (error) {

        return res.status(500).json({ error: error.message });
    }
});

imagesRouter.post('/images', authenticate, async (req, res) => {
    try {
        const form = new multiparty.Form();
        form.parse(req, async (error, fields, files) => {
            if (error) {
                return res.status(500).send(error);
            };
            try {
                const path = files.file[0].path;
                const buffer = fs.readFileSync(path);
                const type = await fileType.fromBuffer(buffer);
                const imageType = type.mime.substr(6);
                const key = `${req.user._id}/${Date.now()}.${imageType}`;
                const data = await uploadFile(buffer, key, type.mime);
                return res.status(200).send(data.Location);
            } catch (err) {
                return res.status(500).send({error: err.message});
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = imagesRouter;