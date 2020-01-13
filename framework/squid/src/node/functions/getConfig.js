const __fs = require('fs');
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

/**
 * @name              getConfig
 * @namespace         squid.node.functions
 * @type              Function
 *
 * Load and process the multiple configurations sources like the "squid.config.default.js" file, the "squid.config.js" one, the "squid/*.js" files as well as the "package.json" squid property
 *
 * @return          {Object}                    The final configuration object
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = () => {

  const defaultConfig = require('../../../squid.config.default.js');
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

  // return the final config
  return config;

};
