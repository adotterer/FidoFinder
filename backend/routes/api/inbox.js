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
          order: [["createdAt", "DESC"]],
          limit: 50,
        })
        .map((message) => {
          return message.info;
        });
    });
    const inboxArray = await Promise.all(messageThreads);
    // const getMessageInfo = messageModels.map((chatRoom) => {
    //   return chatRoom.map((message) => {
    //     return message.info;
    //   });
    // });

    return res.json(inboxArray.filter((chatRoom) => chatRoom.length));
  })
);

module.exports = router;
