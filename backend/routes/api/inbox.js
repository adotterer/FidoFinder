const express = require("express");
const router = express.Router();
const { user_chatRoom, ChatRoom, User } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    // define stuff
    const currentUser = req.user.toSafeObject();
  })
);

module.exports = router;
