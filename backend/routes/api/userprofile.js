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
    res.json(userProfile.toJSON());
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
    res.json(userDetails.UserDetail.status);
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
    res.json(updatedStatusTime);
  })
);

router.post(
  "/me/avatar",
  requireAuth,
  singleMulterUpload("avatar"),
  asyncHandler(async (req, res, next) => {
    console.log(req.user.id, "USER ID");
    // req.file contains the image
    // send to singlePublicFileUpload
    res.json({ message: `hey user #${req.user.id}` });
  })
);
module.exports = router;
