/**
 * @name        isJson
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @example    js
 * const isJson = require('@coffeekraken/node/is/json');
 * if (isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function isJson(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}
