// @ts-nocheck
// @shared

/**
 * @name        isOdd
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if a number is odd or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if odd, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isOdd from '@coffeekraken/sugar/js/is/odd'
 * isOdd(1) // true
 * isOdd(2) // false
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isOdd(value) {
  return value % 2 === 1;
}
export default isOdd;
