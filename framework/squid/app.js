const __fs = require('fs');
const __SquidApp = require('./src/node/SquidApp');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

/**
 * Entry point of the squid framework.
 * This file will load the squid config(s) and init
 * a new SquidApp instance
 */

// load the squid config(s)
const defaultConfig = require('./squid.config.default.js');
let config = defaultConfig;
if (__fs.existsSync(process.cwd() + '/package.json')) {
  const packageJson = require(process.cwd() + '/package.json');
  config = __deepMerge(config, packageJson.squid || {});
}
if (__fs.existsSync(process.cwd() + '/squid.config.js')) {
  const squidConfig = require(process.cwd() + '/squid.config.js');
  config = __deepMerge(config, squidConfig || {});
}
if (__fs.existsSync(process.cwd() + '/squid/routes.js')) {
  const squidRoutes = require(process.cwd() + '/squid/routes.js');
  config.routes = __deepMerge(config.routes, squidRoutes || {});
}
if (__fs.existsSync(process.cwd() + '/squid/server.js')) {
  const squidServer = require(process.cwd() + '/squid/server.js');
  config.server = __deepMerge(config.server, squidServer || {});
}

// create a squid application instance
const squidApp = new __SquidApp(config);
