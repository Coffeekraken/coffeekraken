const __SquidApp = require('./src/node/SquidApp');
const __getConfig = require('./src/node/functions/getConfig');

/**
 * Entry point of the squid framework.
 * This file will load the squid config(s) and init
 * a new SquidApp instance
 */

// load the squid config(s)
const config = __getConfig();

// create a squid application instance
const squidApp = new __SquidApp(config);
