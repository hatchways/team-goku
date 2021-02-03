const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // Accept the file with callback set to true.
    cb(null, true);
  } else {
    // Although the docs for multer show you can pass errors into express err, it doesn't seem to pass the error
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

// By uploading with the key being the id from the upload request, if the same key is being uploaded to, it will replace the old image of the same key.
const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "gokuchefsmenu",
    contentType: multerS3.AUTO_CONTENT_TYPE, //so it doesn't set everything to application/octet-stream content type
    key: function (req, file, cb) {
      cb(null, req.params.id);
    },
  }),
});

module.exports = upload;
