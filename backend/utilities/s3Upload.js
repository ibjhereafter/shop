const AWS = require('aws-sdk');

// const s3 = new AWS.S3( {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY_ID,
//     signatureVersion: process.env.SIGNATURE_VERSION,
//     region: process.env.REGION,
// });

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY_ID,
    signatureVersion: process.env.SIGNATURE_VERSION,
    region: process.env.AWS_BUCKET_REGION

});

const s3 = new AWS.S3();

const uploadFile = (buffer, key, contentType) => {
    const params = {
        Body: buffer,
        ContentType: contentType,
        Bucket: 'jalloh-proshop',
        Key: key,
        AWS_SDK_LOAD_CONFIG: 1,
        endpoint: 'https://ibj.herokuapp.com/'
    };
    return s3.upload(params).promise();
};

module.exports = uploadFile;