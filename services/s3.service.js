require("dotenv").config();
const AWS = require("aws-sdk");

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  // AWS_DEFAULT_REGION,
  AWS_BUCKET,
  AWS_REGION,
} = process.env;

async function imageUpload(folderName, base64Image, imageType) {
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  const s3 = new AWS.S3();

  const params = {
    Bucket: AWS_BUCKET,
    Key: folderName,
    Body: base64Image, // Convert base64 to Buffer
    // ACL: 'public-read',
    ContentEncoding: "base64",
    ContentType: `image/${imageType}`,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        return reject(err);
      }
      console.log(`Image uploaded successfully at ${data.Location}`);
      return resolve({ path: data.Location });
    });
  });
}
async function FileUpload(folderName, base64Image, imageType) {
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: AWS_BUCKET,
    Key: folderName,
    Body: base64Image, // Convert base64 to Buffer
    // ACL: 'public-read',
    ContentEncoding: "base64",
    ContentType: `image/${imageType}`,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading to S3:", err);
        return reject(err);
      }
      console.log(`File uploaded successfully at ${data.Location}`);
      return resolve({ path: data.Location });
    });
  });
}

async function deleteFileFromS3(filepath, fileName) {
  const keys = `${filepath}${fileName}`;
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: keys,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error('Error deleting file from S3:', err);
        return reject(err);
      }
      console.log('File deleted successfully');
      resolve(data);
    });
  });
}


module.exports = {
  imageUpload,
  FileUpload,
  deleteFileFromS3
};
