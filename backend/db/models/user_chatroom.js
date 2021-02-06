"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_chatRoom = sequelize.define(
    "user_chatRoom",
    {
      userId: DataTypes.INTEGER,
      chatRoomId: DataTypes.INTEGER,
    },
    {}
  );
  user_chatRoom.associate = function (models) {
    // associations can be defined here
  };
  return user_chatRoom;
};
