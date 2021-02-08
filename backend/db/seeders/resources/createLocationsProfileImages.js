const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const randomStatus = () => {
  const randomObj = {
    time: Math.floor(Math.random() * Math.ceil(12)),
    amPm: ["am", "pm"][Math.floor(Math.random() * Math.ceil(2))],
    todayTomorrow: ["today", "tomorrow"][
      Math.floor(Math.random() * Math.ceil(2))
    ],
  };
  const statues = [
    "seeking play dates",
    `hosting at ${randomObj.time} ${randomObj.amPm} ${randomObj.todayTomorrow}`,
    "new to the area, looking for friends",
    `${randomObj.time + 4} month old puppy looking for friends!`,
  ];
  return statues[Math.floor(Math.random() * Math.floor(statues.length))];
};

// console.log(faker.image.avatar());
// const userArray = [
//   {
//     email: "demo@user.io",
//     username: "Demo-lition",
//     hashedPassword: bcrypt.hashSync("password"),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     phoneNumber: faker.phone.phoneNumber(),
//     role: "dog_owner",
//   },
//   {
//     email: "onika@pink.com",
//     username: "Barbie",
//     hashedPassword: bcrypt.hashSync("password"),
//     firstName: "Onika",
//     lastName: "Minaj",
//     phoneNumber: faker.phone.phoneNumber(),
//     role: "dog_owner",
//   },
//   {
//     email: "roman@zolanksi.com",
//     username: "Roman",
//     hashedPassword: bcrypt.hashSync("password"),
//     firstName: "Roman",
//     lastName: "Zolanksi",
//     phoneNumber: faker.phone.phoneNumber(),
//     role: "dog_owner",
//   },
//   {
//     email: faker.internet.email(),
//     username: "FakeUser1",
//     hashedPassword: bcrypt.hashSync("password"),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     phoneNumber: faker.phone.phoneNumber(),
//     role: "dog_owner",
//   },
//   {
//     email: faker.internet.email(),
//     username: "FakeUser2",
//     hashedPassword: bcrypt.hashSync("password"),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     phoneNumber: faker.phone.phoneNumber(),
//     role: "dog_owner",
//   },
// ];

// for (let i = 0; i < 100000; i++) {
//   userArray.push({
//     email: faker.internet.email(),
//     username: faker.internet.userName(),
//     hashedPassword: faker.internet.password(),
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     phoneNumber: faker.phone.phoneNumber(),
//     role: "dog_owner",
//   });
// }

// let profileImageArray = [];
// for (let i = 0; i < 100005; i++) {
//   profileImageArray.push({
//     URL: faker.image.imageUrl(),
//   });
// }

let userDetailsArray = [];
for (let i = 1; i <= 10005; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["40.7", "-74.0"], 20);
  userDetailsArray.push({
    liveLocationLat: Number(lat),
    liveLocationLng: Number(lng),
    homeLocationLat: Number(lat),
    homeLocationLng: Number(lng),
    status: randomStatus(),
    online: false,
    userId: i,
    profileImageId: i,
  });
}

let currentLength = userDetailsArray.length + 1;
console.log(userDetailsArray.length + 1);

for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["34.0", "-118.2"], 20);
  userDetailsArray.push({
    liveLocationLat: Number(lat),
    liveLocationLng: Number(lng),
    homeLocationLat: Number(lat),
    homeLocationLng: Number(lng),
    // status: "seeking playdate",
    status: randomStatus(),
    online: false,
    userId: i,
    profileImageId: i,
  });
}

console.log(userDetailsArray.length);
