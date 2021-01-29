const express = require("express");
const router = express.Router();
const upload = require("../services/imageUploadService");
const multer = require("multer");
const singleUpload = upload.single("image");
const mongoose = require("mongoose");
let User = require("../models/user");
let Recipe = require("../models/recipe.js");

router.post("/profile/:id", function (req, res) {
  const id = req.params.id;
  singleUpload(req, res, function (err) {
    if (err || req.wrongFileType) {
      console.log("Entered an error in uploading.");
      return uploadErrorResponse(err);
    }
    fileLocation = req.file.location;
    console.log("Uploaded at " + fileLocation);
    User.findByIdAndUpdate(id, {picture: fileLocation})
      .then(() => successResponse(res))
      .catch((err) => errorResponse(res, err));
  });
});

router.post("/recipe/:id", function (req, res) {
  const id = req.params.id;
  singleUpload(req, res, function (err) {
    if (err) {
      return uploadErrorResponse(err);
    }
    fileLocation = req.file.location;
    console.log("Uploaded at " + fileLocation);
    Recipe.findByIdAndUpdate(id, { picture: fileLocation })
      .then(() => successResponse(res))
      .catch((err) => errorResponse(res, err));
  });
});

function uploadErrorResponse(err) {
  return res.status(500).json({
    success: false,
    errors: {
      title: "Image Upload Error",
      detail: err.message,
      error: err,
    },
  });
}

function successResponse(res) {
  return res.status(200).json({ success: true, response: "Successful Upload" });
}


function errorResponse(res, err) {
  return res.status(400).json({ success: false, error: err });
}

module.exports = router;
