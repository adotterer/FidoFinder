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

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    console.log("hello from router get");
  })
);

router.post(
  "/add",
  requireAuth,
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { dogName, birthday, dogImage } = req.body;

    console.log("req.file", req.file);

    try {
      const dogProfileImgUrl = await singlePublicFileUpload(req.file);
    } catch (e) {
      console.error(e);
    }

    // const dogProfilePicUrl = await singlePublicFileUpload(req.file);
    // const imageUrlId = await Image.addImage(dogProfilePicUrl);

    // console.log(dogProfilePicUrl, "dogProfilePicUrl");
    // console.log(imageUrlId, "imageUrlId ;)");
    res.json({ msg: "hello from post request" });
  })
);

module.exports = router;
