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

  user_chatRoom.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { userId, chatRoomId } = this; // context will be the User instance
    return { userId, chatRoomId };
  };

  return user_chatRoom;
};
