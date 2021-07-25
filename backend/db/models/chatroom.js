"use strict";

module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    "ChatRoom",
    {
      name: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );
  ChatRoom.associate = function (models) {
    const userMapping = {
      as: "AuthorizedChatters",
      through: models.user_chatRoom,
      otherKey: "userId",
      foreignKey: "chatRoomId",
    };
    ChatRoom.belongsToMany(models.User, userMapping);
    ChatRoom.hasMany(models.Message, {
      as: "MessageThread",
      foreignKey: "chatRoomId",
    });
  };
  return ChatRoom;
};
