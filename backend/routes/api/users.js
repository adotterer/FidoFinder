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

router.get(
  "/all",
  requireAuth,
  asyncHandler(async (req, res) => {
    const allUsers = await User.findAll({ limit: 200 });
    res.json(allUsers);
  })
);

router.get(
  "/nearby",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.query;
    console.log(typeof userId, "type of userid");
    const currentLocation = await UserDetail.findOne({
      where: { userId: Number(userId) },
    });

    console.log("currentLocation", currentLocation);

    const { liveLocationLat: lat, liveLocationLng: lng } = currentLocation;

    const nearbyUsers = await User.findAll({
      include: {
        model: UserDetail,
        where: {
          liveLocationLat: { [Op.between]: [lat - 0.5, lat + 0.5] },
          liveLocationLng: { [Op.between]: [lng - 0.5, lng + 0.5] },
        },
      },
      order: [["createdAt", "DESC"]],
      limit: 100,
    });
    // const userDetails = nearbyUsers.map(async (u) => await u.getUserDetail());

    res.json({ nearbyUsers, currentLocation: { lat, lng } });
  })
);

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
    await UserDetail.createDetailsFindLocation(location, user.id);

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
