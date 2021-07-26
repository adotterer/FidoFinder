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
    // const getMessageInfo = messageModels.map((chatRoom) => {
    //   return chatRoom.map((message) => {
    //     return message.info;
    //   });
    // });

    // TODO: sort by the most recent message

    inboxArray = inboxArray.filter((chatRoom) => chatRoom.length);

    const sortedInboxArr = inboxArray.sort(([firstEl], [secondEl]) => {
      const firstParsedDate = Date.parse(firstEl.createdAt);
      const secondParsedDate = Date.parse(secondEl.createdAt);

      return secondParsedDate - firstParsedDate;
    });

    console.log(sortedInboxArr, "sortedArr");

    // THE ARRAY IS SORTED SO THE FIRST ELEMENT HOLDS THE MOST RECENT MESSAGE
    return res.json(sortedInboxArr);
  })
);

module.exports = router;
