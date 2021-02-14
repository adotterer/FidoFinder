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
      through: "user_chatRoom",
      otherKey: "userId",
      foreignKey: "chatRoomId",
    };
    ChatRoom.belongsToMany(models.User, userMapping);
    ChatRoom.hasMany(models.user_chatRoom, {
      foreignKey: "chatRoomId",
    });
  };
  // ChatRoom.get
  // ChatRoom.getAuthorizedUsers = async (chatRoomId) => {
  //   try {
  //     const res = await ChatRoom.findAll({
  //       // { model: User },
  //     });
  //     return res;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  return ChatRoom;
};
