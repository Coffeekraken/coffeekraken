// TODO: doc

module.exports = {
  adapters: {
    console: `${__dirname}/../src/node/log/adapters/SLogConsoleAdapter`
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
  overrideNativeConsole: true,
  invisibleSplitCharacter: '‏‏‎ ‎'
};
