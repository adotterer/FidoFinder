const express = require("express");
const router = express.Router();
const { user_chatRoom, ChatRoom, User } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const currentUser = req.user.toSafeObject();

    const conversations = await user_chatRoom.findAll({
      where: { userId: currentUser.id },
    });

    console.log(
      conversations.map((conversation) => conversation.toSafeObject())
    );
  })
);

module.exports = router;
