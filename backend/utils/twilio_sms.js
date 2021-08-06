const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_KEY;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

export function sendSMS() {
  client.messages
    .create({
      body: "Hello from Node",
      to: "+4126679279", // Text this number
      from: "+2062789595", // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}
