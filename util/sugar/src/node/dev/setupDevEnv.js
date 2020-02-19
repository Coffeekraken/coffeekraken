const __deepMerge = require('../object/deepMerge');
const __flattenObj = require('../../../dist/js/object/flatten');
/**
 * @name                            setupDevEnv
 * @namespace                       sugar.node.dev
 * @type                            Function
 *
 * Set some development environment variables. Some variables are already setted but you can override them as you want. Here's the list of available variables.
 * Note that the development environment variables object is stored in process.env
 *
 * - 'terminal.padding' (default: 6)
 *
 * @param               {Object}                settings                    The settings to set
 * @return              {Object}                                            The development environment object
 *
 * @example             js
 * const setupDevEnv = require('@coffeekraken/node/dev/setupDevEnv');
 * setupDevEnv({
 *    stdout: {
 *      paddings: 12
 *    }
 * });
 * // process.env.STDOUT_PADDING = 12;
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function setupDevEnv(settings) {
  const singleLevelSettingsObj = __flattenObj(settings);

  Object.keys(singleLevelSettingsObj).forEach((k) => {
    process.env[k.toUpperCase()] = singleLevelSettingsObj[k];
  });

  return process.env;
}
