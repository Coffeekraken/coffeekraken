const __path = require('path');
module.exports = {
  cli: {
    config: __path.resolve(__dirname + '/../jest.config.js'),
    // silent: true,
    bail: true
  }
};
