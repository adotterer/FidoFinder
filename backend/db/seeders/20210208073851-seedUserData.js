"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const data = fs.readFileSync(
  __dirname + "/resources/userUserDetailJson.js",
  "utf8",
  (e) => {
    console.error(e);
  }
);

const dogData = fs.readFileSync(
  __dirname + "/resources/dogJSON.js",
  "utf8",
  (e) => {
    console.error(e);
  }
);

const jsonData = JSON.parse(data);
const dogJsonData = JSON.parse(dogData);

// ---> TODO:
// REFACTOR THIS DATA SO I KNOW WHAT CITIES I CAN INSERT
// ---> ALSO:
// COULD PASS IN THE ACTUAL USER AND IMAGE ID BY USING
// RETURNING: TRUE IN THE OPTINOS OF BULK INSERT
const { userArray, userDetailsArray, profileImageArray } = jsonData;
const { dogProfileImgArr, dogArray, dogProfile } = dogJsonData;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log("length of userarray", userArray.length);
    console.log("length of userDetailsArray", userDetailsArray.length);
    console.log("length of profileImageArray", profileImageArray.length);
    try {
      await queryInterface.bulkInsert("Users", userArray, {});
      console.log("SEEDED USER ARRAY");
      await queryInterface.bulkInsert("Images", profileImageArray, {});
      console.log("SEEDED IMAGES");
      await queryInterface.bulkInsert("UserDetails", userDetailsArray, {});
      console.log("SEEDED USERDETAILS");
      await queryInterface.bulkInsert("Images", dogProfileImgArr, {});
      console.log("SEEDED DOG IMAGES");
      await queryInterface.bulkInsert("Dogs", dogArray, {});
      console.log("SEEDED DIG ARRAY");
      await queryInterface.bulkInsert("DogProfiles", dogProfile, {});
      console.log("SEEDED DOG PROFILES");
    } catch (e) {
      console.error(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("DogProfiles");
    queryInterface.bulkDelete("Dogs");
    queryInterface.bulkDelete("UserDetails");
    queryInterface.bulkDelete("Images");
    queryInterface.bulkDelete("user_chatRooms");
    queryInterface.bulkDelete("ChatRooms");
    return queryInterface.bulkDelete("Users");
  },
};
