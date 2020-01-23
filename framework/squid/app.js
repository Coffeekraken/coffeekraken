const __SquidApp = require('./src/node/classes/SquidApp');
const __getConfig = require('./src/node/getConfig');
const { killPortProcess } = require('kill-port-process');
const __path = require('path');

/**
 * Entry point of the squid framework.
 * This file will load the squid config(s) and init
 * a new SquidApp instance
 */
(async () => {

  // load the squid config(s)
  const config = __getConfig();

  // kill the process on actual port
  await killPortProcess(config.server.port); // takes a number, number[], string or string[]

  // create a squid application instance
  global.Squid = new __SquidApp(config);

})();
