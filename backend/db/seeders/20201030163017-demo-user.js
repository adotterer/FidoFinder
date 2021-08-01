"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "doglover45@dogmail.com",
          username: "DogLover45",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phoneNumber: faker.phone.phoneNumber(),
          role: "dog_owner",
        },
        {
          email: "onika@pink.com",
          username: "Barbie",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Onika",
          lastName: "Minaj",
          phoneNumber: faker.phone.phoneNumber(),
          role: "dog_owner",
        },
        {
          email: "roman@zolanksi.com",
          username: "Roman",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "Roman",
          lastName: "Zolanksi",
          phoneNumber: faker.phone.phoneNumber(),
          role: "dog_owner",
        },
        {
          email: faker.internet.email(),
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phoneNumber: faker.phone.phoneNumber(),
          role: "dog_owner",
        },
        {
          email: faker.internet.email(),
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          phoneNumber: faker.phone.phoneNumber(),
          role: "dog_owner",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users");
  },
};
