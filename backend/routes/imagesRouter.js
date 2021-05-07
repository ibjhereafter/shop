const express = require('express');
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
const authenticate = require('../middleware/authenticate');
const admin = require('../middleware/admin');
const imagesRouter = express.Router();

const s3 = new AWS.S3( {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY_ID,
    signatureVersion: "v4",
    region: "eu-central-1",
});

imagesRouter.post('/images', authenticate, async (req, res) => {
    try {
        const { fileType, contentType } = req.body;
        const key = `${req.user._id}/${uuid()}.${fileType}`;

        const params = {
            Bucket: "jalloh-proshop",
            ContentType: contentType,
            Key: key
        }

        const url = await s3.getSignedUrl('putObject', params );

        return res.status(200).json({ url, key });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


module.exports = imagesRouter;