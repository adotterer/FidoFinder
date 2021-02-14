const express = require("express");
const router = express.Router();
const { Dog, DogProfile } = require("../../db/models");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

router.post(
  "/add",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { dogName, birthday, interests, ownerId } = req.body;

    const dogProfilePicUrl = await singlePublicFileUpload(req.file);
    const imageUrlId = await Image.addImage(dogProfilePicUrl);

    console.log(dogProfilePicUrl, "dogProfilePicUrl");
    console.log(imageUrlId, "imageUrlId ;)");
    res.json({ msg: "hello from post request" });
  })
);

module.exports = router;
