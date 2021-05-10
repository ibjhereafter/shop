const S3 = require('aws-sdk/clients/s3');
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_ID;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadFile = function (file, key) {
    const fileStream = fs.readFileSync(file);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: key
    }

    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;
