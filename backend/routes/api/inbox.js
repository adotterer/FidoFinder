const express = require("express");
const router = express.Router();
const { user_chatRoom, Message, ChatRoom, User } = require("../../db/models");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const currentUser = req.user.info;
    const chatRooms = await user_chatRoom.findAll({
      where: { userId: currentUser.id },
    });
    const mappedChatRooms = chatRooms.map(({ info: { chatRoomId } }) => {
      return ChatRoom.findByPk(chatRoomId);
      // return messages;
    });

    const chatRoomModels = await Promise.all(mappedChatRooms);

    const messageThreads = chatRoomModels.map((chatRoom) => {
      return chatRoom
        .getMessageThread({
          include: { model: User },
          order: [["createdAt", "ASC"]],
          limit: 50,
        })
        .map((message) => {
          return message.info;
        });
    });
    let inboxArray = await Promise.all(messageThreads);

    inboxArray = inboxArray.filter((chatRoom) => chatRoom.length);

    const sortedInboxArr = inboxArray.sort(([firstEl], [secondEl]) => {
      const firstParsedDate = Date.parse(firstEl.createdAt);
      const secondParsedDate = Date.parse(secondEl.createdAt);
      return secondParsedDate - firstParsedDate;
    });

    // INBOX SORTED IN DESC ORDER FROM MOST RECENT MESSAGE
    // meaning, sortedInboxArry[0] is the most recent message thread
    return res.json(sortedInboxArr);
  })
);

module.exports = router;
