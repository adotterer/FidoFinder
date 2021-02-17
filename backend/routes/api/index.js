const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
// const chatRouter = require("./chat.js");
const chatRoomRouter = require("./chatRoom.js");
const ipAddressRouter = require("./ipAddress.js");
const userProfileRouter = require("./userprofile.js");
const dogProfileRouter = require("./dogProfile.js");

// GET /api/set-token-cookie
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo-lition",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

// GET /api/restore-user
const { restoreUser } = require("../../utils/auth.js");
router.get("/restore-user", restoreUser, (req, res) => {
  return res.json(req.user);
});

// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

// router.use("/chat", chatRouter);

router.use("/chatroom", chatRoomRouter);

router.use("/ipAddress", ipAddressRouter);

router.use("/user", userProfileRouter); // SINGULAR USER for profile use only

router.use("/dogProfile", dogProfileRouter);

// dog profile route goes here

module.exports = router;
