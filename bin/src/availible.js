const dns = require('dns');

module.exports = (url)  => {
    // uses the core modules to run an IPv4 resolver that returns 'err' on error
    dns.resolve4(url, (err, _addresses) => {
            return err === "";
        });
};