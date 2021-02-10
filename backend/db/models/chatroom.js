"use strict";
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
    // ChatRoom.get
    ChatRoom.getAuthorizedUsers = function (chatRoomId) {
      return ChatRoom.findAll({
        include: {
          model: user_chatRoom,
          where: { chatRoomId },
          include: { model: User },
        },
      }).then((authorizedUsers) => authorizedUsers);
    };
    ChatRoom.belongsToMany(models.User, userMapping);
    ChatRoom.hasMany(models.user_chatRoom, {
      as: "user_chatRoom",
      foreignKey: "chatRoomId",
    });
  };
  return ChatRoom;
};
