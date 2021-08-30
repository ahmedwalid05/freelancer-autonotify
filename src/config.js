const { getRndInteger, getRandomString } = require("./utils");

const JWT_URL = "https://www.freelancer.com/auth/device";
const LOGIN_URL = "https://www.freelancer.com/ajax-api/auth/login.php";

const getProjectUrl = (id) => `https://www.freelancer.com/projects/${id}.html`;
const getWebSocketURL = () =>
  `wss://notifications.freelancer.com/${getRndInteger(
    100,
    999
  )}/${getRandomString(8)}/websocket`;

const getIFFTUrl = (key, event) =>
  `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;

module.exports = {
  JWT_URL,
  LOGIN_URL,
  getWebSocketURL,
  getProjectUrl,
  getIFFTUrl,
};
