const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "google",

  // Optional depending on the providers
  // fetch: customFetchImplementation,
  apiKey: process.env.GOOGLE_API_SECRET, // for Mapquest, OpenCage, Google Premier
  // formatter: "object",
};

const geocoder = NodeGeocoder(options);

const createLocationObj = async (location) => {
  const res = await geocoder.geocode(location);
  const obj = res[0];
  const {
    latitude,
    longitude,
    city,
    administrativeLevels: { level1short },
  } = obj;

  const state = level1short;
  console.log({ lat: latitude, lng: longitude, city, state }, "line 26");
  return { lat: latitude, lng: longitude, city, state };
};

module.exports = { createLocationObj };
