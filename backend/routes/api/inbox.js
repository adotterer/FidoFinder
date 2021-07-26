const express = require("express");
const router = express.Router();
const { user_chatRoom, ChatRoom, User } = require("../../db/models");
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

    let sortedInboxArr = inboxArray.sort(([firstEl], [secondEl]) => {
      const firstParsedDate = Date.parse(firstEl.createdAt);
      const secondParsedDate = Date.parse(secondEl.createdAt);
      return secondParsedDate - firstParsedDate;
    });

    // INBOX SORTED IN DESC ORDER FROM MOST RECENT MESSAGE
    // meaning, sortedInboxArry[0] is the most recent message thread

    sortedInboxArr = sortedInboxArr.map(async (messages) => {
      const topMessage = messages[0];
      const authorizedChatters = await ChatRoom.findByPk(topMessage.chatRoomId)
        .then((chatRoom) => chatRoom.getAuthorizedChatters())
        .then((authorizedChatters) =>
          authorizedChatters.map((chatter) => chatter.info)
        );

      messages[0]["authorizedChatters"] = authorizedChatters;
      messages[0]["otherUsers"] = authorizedChatters.filter(
        (user) => user.id !== currentUser.id
      );
      return messages;
    });
    sortedInboxArr = await Promise.all(sortedInboxArr);
    // TOP MESSAGE NOW INCLUDES AUTHORIZED CHATTERS
    return res.json(sortedInboxArr);
  })
);

module.exports = router;
