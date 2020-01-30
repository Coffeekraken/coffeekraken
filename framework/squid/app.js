require('module-alias/register');

const __SquidApp = require('./src/node/classes/SquidApp');

/**
 * Entry point of the squid framework.
 * This file will load the squid config(s) and init
 * a new SquidApp instance
 */
new __SquidApp();
