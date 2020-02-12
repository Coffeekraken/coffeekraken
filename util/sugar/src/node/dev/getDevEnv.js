const __get = require('../object/get');

/**
 * @name                                getDevEnv
 * @namespace                           sugar.node.dev
 * @type                                Function
 *
 * Get the full development environment object or a particular value by passing a dotted object path like "terminal.paddings"
 *
 * @param                   {String}                      [objectPath=null]                   The dotted object path of the value wanted
 * @return                  {Mixed}                                                           Return either the full development environment object or the wanted value
 *
 * @example                 js
 * const getDevEnv = require('@coffeekraken/sugar/node/dev/getDevEnv');
 * getDevEnv('terminal.paddings'); // => 12
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getDevEnv(objectPath = null) {
  if ( ! process.env.DEV_ENV) return {};
  if (objectPath) {
    return __get(JSON.parse(process.env.DEV_ENV), objectPath);
  }
  return JSON.parse(process.env.DEV_ENV) || {};
}
