/**
 * @name        upperFirst
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Upper first
 *
 * @param    {String}    string    The string to process
 * @return    {String}    The processed string with first letter uppercase
 *
 * @example    js
 * const upperFirst = require('@coffeekraken/sugar/node/string/upperFirst');
 * upperFirst('hello world') // Hello world
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
