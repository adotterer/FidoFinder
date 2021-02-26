const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const dogProfileImgArr = [
  {
    URL:
      "https://fido-finder-bucket.s3-us-west-1.amazonaws.com/1614335904242.jpeg",
  },
  {
    URL:
      "https://fido-finder-bucket.s3-us-west-1.amazonaws.com/1614335044430.png",
  },
];
const dogArray = [
  {
    name: "Penny",
    birthday: faker.date.past(),
    profileImageId: 1006,
    ownerId: 1,
    vaccination: "fully vaccinated",
  },
  {
    name: "Rosie",
    birthday: faker.date.past(),
    profileImageId: 1007,
    ownerId: 2,
    vaccination: "fully vaccinated",
  },
];

const dogProfile = [
  {
    dogId: 1,
    interests: "Bork boxes",
  },
  {
    dogId: 2,
    interests: "Peanut butter",
  },
];

try {
  fs.writeFileSync(
    "dogJSON.js",
    JSON.stringify({
      dogProfileImgArr: dogProfileImgArr,
      dogArray: dogArray,
      dogProfile: dogProfile,
    })
  );
} catch (err) {
  console.error(err);
}
