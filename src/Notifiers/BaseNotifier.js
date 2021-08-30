const Connection = require("../Connection");
class BaseNotifier {
  /**
   *
   * @param {Connection} connection
   */
  constructor(connection) {
    this.connection = connection;
    connection.addListener("NEW_AD", (...params) =>
      this.handleNewAd(...params)
    );
  }
  handleNewAd(message) {
    if (!this.filter(message)) return;

    const formattedMessage = this.formatter(message);

    this.notify(formattedMessage);
  }
  formatter(message) {
    return message;
  }
  filter() {
    return true;
  }
  notify(message) {
    console.log(message);
  }
}
module.exports = BaseNotifier;
