const express = require("express");
const router = express.Router();
const { Dog, DogProfile, Image } = require("../../db/models");
// const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

router.delete(
  "/:id/delete",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    console.log(req.user.id);
    const dog = await Dog.findByPk(id);
    if (dog.ownerId === req.user.id) {
      console.log("valid request")
    } else {
      next(new Error("DELETE FORBIDDEN"));
    }
    console.log(dog.toJSON());
  })
);

router.post(
  "/add",
  requireAuth,
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { dogName, birthday, interests, dogImage } = req.body;

    let dogProfileImgUrl;
    try {
      dogProfileImgUrl = await singlePublicFileUpload(req.file);
    } catch (e) {
      console.error(e);
    }

    const owner = req.user.toJSON();

    const profileImageId = await Image.addImage(dogProfileImgUrl);

    const newDog = await Dog.create(
      {
        name: dogName,
        birthday,
        profileImageId,
        ownerId: owner.id,
        vaccination: null,
      },
      { returning: true }
    );

    const createDogProfile = await DogProfile.create({
      interests,
      dogId: newDog.id,
    });

    const sendDog = await Dog.findByPk(newDog.id, {
      include: [{ model: DogProfile }, { model: Image, as: "ProfileImage" }],
    });

    // const sendObj = {
    //   newDog,
    //   ProfileImage: { URL: dogProfileImgUrl },
    //   DogProfile: { createDogProfile },
    // };
    // console.log(sendObj, "obj");
    res.json(sendDog);
  })
);

module.exports = router;
