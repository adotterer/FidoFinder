"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      userId: DataTypes.INTEGER,
      chatRoomId: DataTypes.INTEGER,
      message: DataTypes.STRING,
      read: DataTypes.BOOLEAN,
    },
    {}
  );
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.ChatRoom, { foreignKey: "chatRoomId" });
  };
  return Message;
};
