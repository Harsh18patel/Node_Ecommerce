const KEY = "ACa0decae956145c6b012346f331a1a00b";
const TOKEN = "d6ee77c760ec3957a4d1f66c47c628be";

const client = require("twilio")(KEY,TOKEN);

const otp = Math.trunc(Math.random() * 1000000);
client.messages
    .create({
      body: `your otp is ${otp}`,
      from: "+19382224912",
      to: `+919512540136`,
    })
    .then((message)=>console.log(message.sid));
    return otp;

