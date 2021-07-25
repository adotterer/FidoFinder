"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_chatRoom = sequelize.define(
    "user_chatRoom",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      userId: DataTypes.INTEGER,
      chatRoomId: DataTypes.INTEGER,
    },
    {
      getterMethods: {
        info() {
          const { id, username, email } = this;
          return { id, username, email };
        },
      },
    }
  );
  user_chatRoom.associate = function (models) {
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
    return { id, userId, chatRoomId };
  };

  return user_chatRoom;
};
