const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, UserDetail } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.get("/all", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

router.get("/nearby", async (req, res) => {
  const { userId } = req.query;
  // console.log(
  //   "here is this===> ",
  //   await User.getCurrentUserLocationById(userId)
  // );

  const currentLocation = await User.getCurrentUserLocationById(userId);
  console.log("here is this thing---> ", currentLocation);

  const {
    dataValues: { liveLocationLat: latitude, liveLocationLng: longitude },
  } = currentLocation;

  const nearbyUsers = await User.findAll({
    include: {
      model: UserDetail,
      where: {
        liveLocationLat: { [Op.between]: [latitude - 0.5, latitude + 0.5] },
        liveLocationLng: { [Op.between]: [longitude - 0.5, longitude + 0.5] },
      },
    },
    order: [["createdAt", "DESC"]],
    limit: 100,
  });
  // const userDetails = nearbyUsers.getUserDetail();

  res.json(nearbyUsers);
});

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
      username,
      location,
      phoneNumber,
      firstName,
      lastName,
    } = req.body;

    const user = await User.signup({
      email,
      username,
      password,
      phoneNumber,
      firstName,
      lastName,
    });
    try {
      UserDetail.createDetailsFindLocation(location, user.id);
    } catch (e) {
      console.error(e);
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
