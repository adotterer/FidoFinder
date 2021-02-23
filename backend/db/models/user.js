"use strict";
const { Validator, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: [
            "hashedPassword",
            "email",
            "createdAt",
            "updatedAt",
            "lastName",
            "phoneNumber",
          ],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  User.associate = function (models) {
    const chatRoomMapping = {
      as: "Conversations",
      through: models.user_chatRoom,
      otherKey: "chatRoomId",
      foreignKey: "userId",
    };

    User.hasOne(models.UserDetail, { foreignKey: "userId" });
    User.belongsToMany(models.ChatRoom, chatRoomMapping);
    User.hasMany(models.Dog, { foreignKey: "ownerId" });
    User.hasMany(models.Message, { foreignKey: "userId" });
  };
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserLocationById = async function (id) {
    const user = await User.findByPk(id);
    const userDetails = await user.getUserDetail();

    return userDetails;
  };

  User.checkOnlineStatusById = async function (id) {
    const user = await User.findByPk(id);
    const data = await user.getUserDetail();
    return { user, data };
  };

  User.onlineStatusById = User.login = async function ({
    credential,
    password,
  }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({
    username,
    email,
    password,
    phoneNumber,
    firstName,
    lastName,
  }) {
    const hashedPassword = bcrypt.hashSync(password);
    const role = "dog_owner";
    const user = await User.create({
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role,
    });
    return await User.scope("currentUser").findByPk(user.id);
  };
  return User;
};
