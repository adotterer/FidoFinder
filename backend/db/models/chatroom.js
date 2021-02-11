"use strict";

const User = require("./User");
const user_chatRoom = require("./user_chatRoom");

module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    "ChatRoom",
    {
      name: DataTypes.STRING,
    },
    {}
  );

  ChatRoom.associate = function (models) {
    const userMapping = {
      through: "user_ChatRoom",
      otherKey: "userId",
      foreignKey: "chatRoomId",
    };
    ChatRoom.belongsToMany(models.User, userMapping);
    ChatRoom.hasMany(models.user_chatRoom, {
      as: "user_chatRoom",
      foreignKey: "chatRoomId",
    });
  };
  // ChatRoom.get
  ChatRoom.getAuthorizedUsers = async function (chatRoomId) {
    return await user_chatRoom.findAll({
      include: { model: ChatRoom },
      // { model: User },
    });
  };
  return ChatRoom;
};
