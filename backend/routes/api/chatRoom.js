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

  // FIND ONE user_chatRoom associations
  let alreadyCreatedRoom;
  try {
    // TODO: REFACTOR THIS QUERY SO IT FUNCTIONS WITH > 2 USERS, AND IS JUST BETTER...
    alreadyCreatedRoom = await ChatRoom.findOne({
      where: {
        name: {
          [Op.or]: [
            `${sessionUsername} & ${otherUsername}`,
            `${otherUsername} & ${sessionUsername}`,
          ],
        },
      },
      include: {
        model: user_chatRoom,
        as: "user_chatRoom",
        where: {
          userId: {
            [Op.in]: [sessionUserId, otherUserId],
          },
          // [Op.or]: [
          //   {
          //     userId: sessionUserId,
          //   },
          //   {
          //     userId: otherUserId,
          //   },
          // ],
        },
      },
    });
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("HERE IS ALREADY CREATED THE CHAT ROOM:");
    console.log("sessionUserId: ", sessionUserId, "otherUserId: ", otherUserId);
    console.log(alreadyCreatedRoom);

    // alreadyCreatedRoom.forEach((room) => {
    //   console.log(room.dataValues);
    // })
    console.log("------------------------");
    console.log("------------------------");
  } catch (e) {
    console.log("ERROR FROM CHAT TABLE QUERY");
    console.error(e);
  }

  // If no chat room exists yet, it creates a new one
  let newChatRoom;
  console.log(!alreadyCreatedRoom);
  if (!alreadyCreatedRoom) {
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("RUNNING CHATROOM CREATION");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    console.log("------------------------");
    try {
      newChatRoom = await ChatRoom.create({
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

  // NOW RETURN SEND CHATROOM NUMBER BACK TO FRONTEND
  if (alreadyCreatedRoom !== null) {
    const {
      dataValues: { id },
    } = alreadyCreatedRoom;
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("ALREADY CREATED ROOM #: ");
    console.log(id);
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    return res.json({ chatRoomId: id });
  } else if (newChatRoom !== null) {
    const {
      dataValues: { id },
    } = newChatRoom;
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("NEW ROOM #: ");
    console.log(id);
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    console.log("-----------------------");
    return res.json({ chatRoomId: id });
  }
});

module.exports = router;