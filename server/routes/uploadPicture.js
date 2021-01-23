const express = require("express");
const router = express.Router();
const upload = require("../services/ImageUpload");
const singleUpload = upload.single("image");

router.post("/uploadpicture", function (req, res) {
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
    // The uploaded file location will need to be stored in the database. 
    // Also the post request will need to be updated to hold the user id to know which user to update.
    console.log(req.file.location);

    res.status(200).send({ success: true, response: "Successful Upload" });
  });
});

module.exports = router;
