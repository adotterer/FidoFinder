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

router.post(
  "/status",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // const { status } = req.body;
    console.log("req to jsON", req.body);
    // console.log("STATUS", status);
    // res.json("Hey bitch");
  })
);

module.exports = router;
