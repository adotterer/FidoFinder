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
    user_chatRoom.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      hooks: true,
    });
    user_chatRoom.belongsTo(models.ChatRoom, {
      foreignKey: "chatRoomId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return user_chatRoom;
};
