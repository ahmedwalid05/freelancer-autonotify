const crypto = require("crypto");

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const getRandomString = (length) => crypto.randomBytes(length).toString("hex");

const escapeRegex = (string) => {
  return string.replace(/"/g, '\\"');
};

module.exports = {
  getRndInteger,
  getRandomString,
  escapeRegex,
};
