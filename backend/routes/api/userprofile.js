const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");

router.get(
  "/:userId",
  requireAuth,
  asyncHandler(async (req, res) => {
    const allUsers = []; // User p
    const { userId } = req.params;
    res.json({ msg: "hello from /:userId", userId });
  })
);

module.exports = router;
