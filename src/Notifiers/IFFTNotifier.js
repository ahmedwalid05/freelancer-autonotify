const { default: axios } = require("axios");

const BaseNotifier = require("./BaseNotifier");
const { getProjectUrl, getIFFTUrl } = require("../config");

class IFFTNotifier extends BaseNotifier {
  constructor(connection, { keywords = [], Ifft: { key, eventName } }) {
    super(connection);
    this.key = key;
    this.eventName = eventName;
    this.regexMatcher = new RegExp(keywords.join("|"), "gi");
  }

  filter(data) {
    if (data.channel !== "user") return false;

    const { title, appended_descr } = data.body.data;

    const isInTitle = this.regexMatcher.test(title);
    const isIntDescription = this.regexMatcher.test(appended_descr);
    return isInTitle || isIntDescription;
  }

  formatter(object) {
    const {
      title,
      appended_descr,
      minbudget,
      maxbudget,
      currencyCode,
      projIsHourly,
      id,
    } = object.body.data;
    return {
      value1: title,
      value2: `From: ${minbudget} To: ${maxbudget} ${currencyCode}\nHourly: ${projIsHourly}\nDescription: ${appended_descr}}`,
      value3: getProjectUrl(id),
    };
  }

  async notify(data) {
    console.log("Notifying For: ", data.value3);
    const url = getIFFTUrl(this.key, this.eventName);
    await axios.post(url, data);
  }
}

module.exports = IFFTNotifier;
