const __deepMerge = require('../object/deepMerge');
/**
 * @name                            setupDevEnv
 * @namespace                       sugar.node.dev
 * @type                            Function
 *
 * Set some development environment variables. Some variables are already setted but you can override them as you want. Here's the list of available variables.
 * Note that the development environment variables object is stored in process.env.DEV_ENV
 *
 * - 'terminal.padding' (default: 6)
 *
 * @param               {Object}                settings                    The settings to set
 * @return              {Object}                                            The development environment object
 *
 * @example             js
 * const setupDevEnv = require('@coffeekraken/node/dev/setupDevEnv');
 * setupDevEnv({
 *    terminal: {
 *      paddings: 12
 *    }
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setupDevEnv(settings) {
  if ( ! process.env.DEV_ENV) {
    process.env.DEV_ENV = JSON.stringify({});
  }
  const newValue = __deepMerge(JSON.parse(process.env.DEV_ENV), settings);
  process.env.DEV_ENV = JSON.stringify(newValue);
  return newValue;
}
