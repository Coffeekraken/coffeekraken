// @ts-nocheck

/**
 * @name        isRegexp
 * @namespace            js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isRegexp from '@coffeekraken/sugar/js/is/regexp'
 * if (isRegexp(/^hello$/g) {
 *   // do something
 * }
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isRegexp(value) {
  return value && typeof value === 'object' && value.constructor === RegExp;
}
export default isRegexp;
