const fs = require("fs");
const faker = require("faker");
const bcrypt = require("bcryptjs");

// TODO: WRITE VARIABLE FOR DIFFERENT NUMBER
// OF SEEDERS

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "_",
];

const randomStatus = () => {
  const randomObj = {
    time: Math.floor(Math.random() * Math.ceil(11) + 1),
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

const userArray = [];

const createdNames = [];
const createdEmails = [];

for (let i = 0; i < 1000; i++) {
  let userName;

  const createUserName = function () {
    return (
      faker.internet.userName() +
      Math.floor(Math.random() * Math.floor(900)) +
      letters[Math.floor(Math.random() * letters.length)]
    );
  };
  let email;
  const createEmail = function () {
    let initialEmail = faker.internet.email().split("@");
    email =
      initialEmail[0] +
      Math.floor(Math.random() * Math.floor(900)) +
      letters[Math.floor(Math.random() * letters.length)] +
      initialEmail[1];
    return email;
  };
  userArray.push({
    email: String(createEmail()),
    username: String(createUserName()).slice(0, 29),
    hashedPassword: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    role: "dog_owner",
  });
}

let profileImageArray = [];
for (let i = 0; i < 1005; i++) {
  profileImageArray.push({
    URL: faker.image.imageUrl(),
  });
}

const zoomVariation = () => {
  return Math.ceil(Math.random() * 20);
};

const latLngVariation = () => {
  const positive = 0.4;
  const negative = -0.4;
  const num = Math.floor(Math.random() * 2) === 0 ? positive : negative;

  return Number.parseFloat((Math.random() * num).toPrecision(3));
};

let userDetailsArray = [];
// CREATE NEW YORK LOCATIONS
for (let i = 1; i <= 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [40.73 + latLngVariation(), -74.17 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [34.0 + latLngVariation(), -118.2 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [41.8 + latLngVariation(), -87.6 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [32.8 + latLngVariation(), -96.8 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [39.7 + latLngVariation(), -105.0 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [33.7 + latLngVariation(), -84.4 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [33.7 + latLngVariation(), -84.4 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [37.8 + latLngVariation(), -122.4 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 100; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [19.89 + latLngVariation(), -155.58 + latLngVariation()],
    zoomVariation()
  );
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
for (let i = currentLength; i <= currentLength + 96; i++) {
  let [lat, lng] = faker.address.nearbyGPSCoordinate(
    [33.44 + latLngVariation(), -112.07 + latLngVariation()],
    zoomVariation()
  );
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

// THESE NEED TO BE EQUAL
console.log(
  userArray.length,
  userDetailsArray.length,
  profileImageArray.length
);

// TODO:
// DRY up code
// fs remove previous json file, if it exists

try {
  fs.writeFileSync(
    "userUserDetailJson.js",
    JSON.stringify({
      userArray: userArray,
      userDetailsArray: userDetailsArray,
      profileImageArray: profileImageArray,
    })
  );
} catch (err) {
  console.error(err);
}
