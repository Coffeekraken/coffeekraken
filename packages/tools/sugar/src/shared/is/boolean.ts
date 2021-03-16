// @ts-nocheck
// @shared

/**
 * @name        isBoolean
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a js Boolean
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isBoolean from '@coffeekraken/sugar/js/is/boolean'
 * if (isBoolean(true) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isBoolean(value) {
  return typeof value === 'boolean';
}
export default isBoolean;
