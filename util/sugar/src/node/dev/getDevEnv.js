const __get = require('../object/get');
const __parse = require('../string/parse');

/**
 * @name                                getDevEnv
 * @namespace                           sugar.node.dev
 * @type                                Function
 *
 * Get the full development environment object or a particular value by passing a dotted object path like "stdout.padding"
 *
 * @param                   {String}                      [objectPath=null]                   The dotted object path of the value wanted
 * @return                  {Mixed}                                                           Return either the full development environment object or the wanted value
 *
 * @example                 js
 * const getDevEnv = require('@coffeekraken/sugar/node/dev/getDevEnv');
 * getDevEnv('stdout.padding'); // => 12
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function getDevEnv(objectPath = null) {
  if (objectPath) {
    return __parse(process.env[objectPath.replace('.','_').toUpperCase()]);
  }
  return process.env;
}
