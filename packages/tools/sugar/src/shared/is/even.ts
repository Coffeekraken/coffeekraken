// @ts-nocheck

/**
 * @name        isEven
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if a number is even or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if even, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isEven from '@coffeekraken/sugar/js/is/even'
 * isEven(1) // false
 * isEven(2) // true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isEven(value) {
  return value % 2 === 0;
}
export default isEven;
