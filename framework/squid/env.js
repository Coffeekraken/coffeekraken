const __getConfig = require('./src/node/getConfig');

// set some env variables
global.__squid = {
  rootPath: __dirname,
  cwd: process.cwd(),
  config: __getConfig()
};
