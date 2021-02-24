const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const { User, UserDetail, Dog } = require("../../db/models");
const user = require("../../db/models/user");

router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userProfile = await User.findByPk(userId, {
      include: [{ model: UserDetail }, { model: Dog }],
    });
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
    console.log("hey", userDetails.UserDetail.status);
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

module.exports = router;
