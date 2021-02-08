const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

// console.log(faker.image.avatar());
const userArray = [
  {
    email: "demo@user.io",
    username: "Demo-lition",
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
];

for (let i = 0; i < 100000; i++) {
  userArray.push({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    hashedPassword: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    role: "dog_owner",
  });
}

let profileImageArray;
for (let i = 0; i < 100005; i++) {
  profileImageArray.push({
    URL: faker.internet.avatar(),
  });
}

console.log(userArray.length);
