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
    Message.belongsTo(models.User, { foreignKey: "userId" });
  };
  Message.prototype.getNotifUsers = async function (senderId) {
    const users = this.getChatRoom()
      .then((chatRoom) => chatRoom.getAuthorizedChatters())
      .then((users) => users.map((user) => user.toJSON()))
      .then((users) => users.filter((user) => user.id !== senderId))
      .catch((e) => console.error(e));
    return users;
  };
  return Message;
};
