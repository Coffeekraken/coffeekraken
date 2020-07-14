const __SLogConsoleAdapter = require('../node/log/adapters/SLogConsoleAdapter');
// TODO: doc

module.exports = {
  adapters: {
    console: new __SLogConsoleAdapter({})
  },
  adaptersByLevel: {
    log: null,
    info: null,
    warn: null,
    debug: null,
    error: null
  },
  adaptersByEnvironment: {
    test: null,
    development: null,
    production: null
  },
  overrideNativeConsole: true
};
