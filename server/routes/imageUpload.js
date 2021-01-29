const express = require("express");
const router = express.Router();
const upload = require("../services/ImageUploadService");
const singleUpload = upload.single("image");
const mongoose = require("mongoose");
let User = require("../models/user");


router.post("/profile/:id", function (req, res) {
  const id = req.params.id;
  singleUpload(req, res, function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    fileLocation = req.file.location;
    console.log("Uploaded at " + fileLocation);
    User.findByIdAndUpdate(id, {picture: fileLocation})
      .then(() => {
        res.status(200).json({ success: true, response: "Successful Upload" });
      })
      .catch((err) => res.status(400).json({ success: false, error: err }));
  });
});

module.exports = router;
