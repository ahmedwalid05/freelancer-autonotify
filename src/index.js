require("dotenv").config();

const Connection = require("./Connection");
const IFFTNotifier = require("./Notifiers/IFFTNotifier");

const keywords = process.env.keywords.replace(/\s+/g, "").split(",");

const connection = new Connection({
  username: process.env.email,
  password: process.env.password,
  subscriptions: [...Array(5000).keys()].slice(1),
});

new IFFTNotifier(connection, {
  keywords,
  Ifft: {
    key: process.env.IFFT_KEY,
    eventName: process.env.IFFT_EVENT_NAME,
  },
});
