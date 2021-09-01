const dns = require("dns");

module.exports = (url) => {
  dns.resolve4(url, (_err, addresses) => {
    return addresses === undefined;
  });
};
