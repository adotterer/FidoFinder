const express = require("express");
const router = express.Router();
const { User, user_chatRoom, ChatRoom } = require("../../db/models");

router.get("/add", async (req, res) => {
  const { Op } = require("sequelize");
  const {
    sessionUserId,
    otherUserId,
    sessionUsername,
    otherUsername,
  } = req.query;

  // FIND ALL user_chatRoom associations
  let allUserChatRooms;
  try {
    allUserChatRooms = await ChatRoom.findAll({
      include: {
        model: user_chatRoom,
        where: {
          [Op.and]: [
            {
              userId: sessionUserId,
            },
            {
              userId: otherUserId,
            },
          ],
        },
      },
    });
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("HERE ARE ALL CHAT ROOMS:");
    console.log("sessionUserId: ", sessionUserId, "otherUserId: ", otherUserId);
    console.log(allUserChatRooms);
    console.log("------------------------");
    console.log("------------------------");
  } catch (e) {
    console.log("NO RESULTS FOUND!");
    console.error(e);
  }

  // const foundChatRooms = await user_chatRoom.findAll({
  //   where: {
  //     userId: { [Op.in]: [sessionUserId, otherUserId] },
  //   },
  // });

  // If both associations do not share the same chat room-- or the length is 0, then create the entries in the database

  // const chatRoomIdArray = foundChatRooms.map((chatRoom) => {
  //   return chatRoom.dataValues.chatRoomId;
  // });

  // console.log(
  //   "is every chatroom id the same?",
  //   chatRoomIdArray.every((value) => value === chatRoomIdArray[0])
  // );

  // Is every chatroom id the same?
  // const alreadyCreatedChatRoom = chatRoomIdArray.every(
  //   (value) => value === chatRoomIdArray[0]
  // );

  if (!allUserChatRooms) {
    try {
      const newChatRoom = await ChatRoom.create({
        name: `${sessionUsername} & ${otherUsername}`,
      });
      const sessionUserChatRoomUserAssociation = user_chatRoom.create({
        userId: sessionUserId,
        chatRoomId: newChatRoom.id,
      });
      const otherUserChatRoomUserAssociation = user_chatRoom.create({
        userId: otherUserId,
        chatRoomId: newChatRoom.id,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return res.end();
});

module.exports = router;
