const { default: axios } = require("axios");
const FormData = require("form-data");

const { EventEmitter } = require("events");
const WebSocket = require("ws");

const { LOGIN_URL, JWT_URL, getWebSocketURL } = require("./config");

const { escapeRegex } = require("./utils");

class Connection extends EventEmitter {
  /**
   *
   * @param {Object} connectionParams
   * @param {String} connectionParams.username
   * @param {String} connectionParams.password
   */
  constructor({ username, password, subscriptions }) {
    super();
    this.username = username;
    this.password = password;
    this.subscriptions = subscriptions;

    this.initializeConnection();
  }

  initializeConnection() {
    const url = getWebSocketURL();
    this.ws = new WebSocket(url);
    this.ws.on("open", this.onOpen);
    this.on("close", this.onClose);
    this.ws.on("message", (...params) => this.onMessage(...params));
  }
  onOpen() {
    console.log("Connected Successfully");
  }
  async onMessage(message) {
    const decodedMessage = new TextDecoder().decode(message);
    const firstCharacter = decodedMessage[0];
    switch (firstCharacter) {
      case "o":
        await this.login();
        await this.subscribe();
        break;
      case "a":
        const parsedMessage = this.parseMessage(decodedMessage);
        this.emit("NEW_AD", parsedMessage);
        break;
      default:
        break;
    }
  }
  onClose() {
    console.log("Closed");
  }
  async login() {
    await this.loadAuthCookie();
    await this.sendMessage("auth", {
      hash2: decodeURIComponent(this.hash2),
      user_id: this.userId,
    });
    console.log("Authenticated successfully");
  }

  async subscribe() {
    await this.sendMessage("channels", {
      channels: this.subscriptions,
    });
    console.log("Subscribed successfully");
  }

  sendMessage(channel, data) {
    const message = this.stringyObject(channel, data);
    this.ws.send(message, this.handleError);
  }

  stringyObject(channel, object) {
    const authObj = escapeRegex(
      JSON.stringify({
        channel,
        body: object,
      })
    );
    const data = `["${authObj}"]`;
    return data;
  }
  async getJwtToken() {
    const response = await axios.get(JWT_URL);
    return response.data.result.token;
  }
  async loadAuthCookie() {
    const JwtToken = await this.getJwtToken();

    const bodyFormData = new FormData();
    bodyFormData.append("user", this.username);
    bodyFormData.append("password", this.password);
    bodyFormData.append("device_token", JwtToken);

    try {
      const response = await axios.post(LOGIN_URL, bodyFormData, {
        headers: {
          ...bodyFormData.getHeaders(),
          "Content-Length": bodyFormData.getLengthSync(),
        },
      });
      this.hash2 = response.data.result.token;
      this.userId = response.data.result.user;
      return response.data.result.token;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  parseMessage(message) {
    return JSON.parse(JSON.parse(message.slice(1))[0]);
  }

  handleError(error) {
    if (error) console.error("Web Socket error", error);
  }
}
module.exports = Connection;
