"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_chatRoom = sequelize.define(
    "user_chatRoom",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
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

  user_chatRoom.prototype.toSafeObject = function () {
    const { id, userId, chatRoomId } = this;
    console.log("line 27 of user_chatroom.js", id);
    return { id, userId, chatRoomId };
  };

  return user_chatRoom;
};
