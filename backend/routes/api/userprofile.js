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

module.exports = router;
