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

let profileImageArray = [];
for (let i = 0; i < 100005; i++) {
  profileImageArray.push({
    URL: faker.image.imageUrl(),
  });
}

let userDetailsArray = [];
// CREATE NEW YORK LOCATIONS
for (let i = 1; i <= 10000; i++) {
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

// CREATE LOS ANGELES LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["34.0", "-118.2"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE CHICAGO LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["41.8", "-87.6"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE DALLAS LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["32.8", "-96.8"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE DENVER LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["39.7", "-105.0"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE ATLANTA LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["33.7", "-84.4"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE ATLANTA LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["33.7", "-84.4"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE SF LOCATIONS
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["37.8", "-122.4"], 20);
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

currentLength = userDetailsArray.length + 1;
// CREATE HAWAII COORDINATES
for (let i = currentLength; i <= currentLength + 10000; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["19.89", "-155.58"], 10);
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

currentLength = userDetailsArray.length + 1;
// CREATE PHONEIX COORDINATES
for (let i = currentLength; i <= currentLength + 9996; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(["33.44", "-112.07"], 10);
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

console.log(userArray.length === userDetailsArray.length);
