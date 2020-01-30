/**
 * @name                          isJs
 * @namespace                     sugar.node.is
 * @type                          Function
 *
 * Detect if the current script is running under nodejs or not...
 *
 * @return              {Boolean}                       true if is nodejs, false if not...
 *
 * @example         js
 * const isJs = require('@coffeekraken/sugar/node/is/js');
 * isJs(); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = () => {
  return (typeof window !== 'undefined');
}
