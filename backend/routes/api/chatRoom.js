const express = require("express");
const router = express.Router();
const { User, user_chatRoom, ChatRoom } = require("../../db/models");
const { Op } = require("sequelize");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");

// SEND MESSAGES IN DATABASE TO CHATROOM ON FRONTEND
router.get(
  "/:chatRoomId/loadMessages",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    // TODO: MAKE SURE AUTHORIZED USER ID IS ONE OF THE AUTHORIZED USERS IN CHATROOM
    const { chatRoomId } = req.params;

    return ChatRoom.findByPk(chatRoomId, {
      // include: {
      //   model: "MessageThread",
      //   order: ["createdAt", "DESC"],
      //   limit: 50,
      // },
    })
      .then((chatRoom) => {
        if (!chatRoom) {
          throw Error("no chatRoom");
        }
        return chatRoom.getMessageThread({
          include: User,
          order: [["createdAt", "DESC"]],
          limit: 50,
        });
      })
      .then((thread) => thread.map((msg) => msg.toJSON()))
      .then((json) => res.json(json))
      .catch((e) => {
        next(e);
      });
  })
);

// SEND BACK AUTHORIZED USERS OF CHATROOM ID
router.get(
  "/:chatRoomId/auth",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { chatRoomId } = req.params;

    return ChatRoom.findByPk(chatRoomId, {
      include: [{ model: User, as: "AuthorizedChatters" }],
    })
      .then((chatRoom) => {
        if (!chatRoom) {
          throw Error("no chatRoom");
        } else return chatRoom.toJSON();
      })
      .then((chatRoomObj) => res.json(chatRoomObj.AuthorizedChatters))

      .catch((e) => next(e));
  })
);

router.get(
  "/add",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { sessionUserId, otherUserId, sessionUsername, otherUsername } =
      req.query;

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
      });
    } catch (e) {
      console.log("ERROR FROM CHAT TABLE QUERY");
      console.error(e);
      next(e);
    }

    // If no chat room exists yet, it creates a new one
    let newChatRoom;

    if (!alreadyCreatedRoom) {
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
    // GRAB ALL USER INFORMATION TO SEND BACK TO PUT IN REDUX
    const userInfo = await User.findAll({
      where: { id: { [Op.in]: [sessionUserId, otherUserId] } },
    });

    // NOW RETURN SEND CHATROOM NUMBER BACK TO FRONTEND
    if (alreadyCreatedRoom !== null) {
      const {
        dataValues: { id },
      } = alreadyCreatedRoom;
      return res.json({
        chatRoomId: id,
        users: userInfo,
      });
    } else if (newChatRoom !== null) {
      const {
        dataValues: { id },
      } = newChatRoom;
      return res.json({
        chatRoomId: id,
        users: userInfo,
      });
    }
  })
);

module.exports = router;
