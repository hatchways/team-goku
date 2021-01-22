const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3();

require("dotenv").config();

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "gokuchefsmenu",
    contentType: multerS3.AUTO_CONTENT_TYPE, //so it doesn't set everything to application/octet-stream content type
    key: function (req, file, cb) {
      var fileExt = "";
      if (file.mimetype === "image/jpeg") {
        fileExt = ".jpeg";
      } else if (file.mimetype === "image/png") {
        fileExt = ".png";
      }
      cb(null, Date.now().toString() + fileExt);
    },
  }),
});

module.exports = upload;
