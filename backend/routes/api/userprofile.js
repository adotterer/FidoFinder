const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const { User, UserDetail, Dog, DogProfile, Image } = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../utils/awsS3");

router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userProfile = await User.findByPk(userId, {
      include: [
        { model: UserDetail },
        {
          model: Dog,
          include: [
            { model: DogProfile },
            { model: Image, as: "ProfileImage" },
          ],
        },
      ],
    }).catch((e) => console.error(e));
    return res.json(userProfile.toJSON());
  })
);

router.get(
  "/:userId/status",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userDetails = await User.findByPk(userId, {
      include: {
        model: UserDetail,
      },
    }).then((user) => user.toJSON());
    return res.json(userDetails.UserDetail.status);
  })
);

router.post(
  "/status",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { status } = req.body;

    const updatedStatusTime = await User.findByPk(req.user.toJSON().id)
      .then((user) => user.getUserDetail())
      .then((userDetail) => userDetail.update({ status }))
      .then((updatedUserDetail) => updatedUserDetail.toJSON())
      .then((userDetailObj) => {
        const now = new Date();
        return userDetailObj.updatedAt
          ? userDetailObj.updatedAt
          : now.toLocaleString();
      })
      .catch((e) => console.error(e));
    console.log(updatedStatusTime);
    return res.json(updatedStatusTime);
  })
);

router.get(
  "/me/dogs/pics",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // should send all of the dog profile picture URL's
    // the user is able to select one of these as their avatar

    const userDogs = await Dog.findAll({
      where: { ownerId: req.user.id },
      include: [{ model: Image, as: "ProfileImage" }],
    });
    const dogPics = userDogs.map((dog) => {
      return dog.ProfileImage.info;
    });
    return res.json(dogPics);
  })
);

router.post(
  "/me/avatar",
  requireAuth,
  singleMulterUpload("avatar"),
  asyncHandler(async (req, res, next) => {
    console.log(userDogs, "user dogs");
    // req.file contains the image
    // send to singlePublicFileUpload
    return res.json({ message: `hey user #${req.user.id}` });
  })
);
module.exports = router;
