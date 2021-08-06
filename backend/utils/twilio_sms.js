const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_KEY;
const ownerPhoneNum = process.env.OWNER_PHONE_NUM;
const twilioPhoneNum = process.env.TWILIO_PHONE_NUM;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

function notifyOwnerOfUser(geoObj, clientIp) {
  const message = `\nFidoFinder
  \nAnonymous visitor from ${geoObj.city}, ${geoObj.country}
  \n ## IP Address: ${clientIp}
  \n ## Lat: ${geoObj.ll[0]}
  \n ## Lng: ${geoObj.ll[1]}`;

  client.messages
    .create({
      body: message,
      to: ownerPhoneNum, // Text this number
      from: twilioPhoneNum, // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  console.log("sent");
}

module.exports = { notifyOwnerOfUser };
