/**
 * @name                          isNode
 * @namespace                     sugar.node.is
 * @type                          Function
 *
 * Detect if the current script is running under nodejs or not...
 *
 * @return              {Boolean}                       true if is nodejs, false if not...
 *
 * @example         js
 * const isNode = require('@coffeekraken/sugar/node/is/node');
 * isNode(); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = () => {
  return (typeof process !== 'undefined') && (process.release.name === 'node');
}
