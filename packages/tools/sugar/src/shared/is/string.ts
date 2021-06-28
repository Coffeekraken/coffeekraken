// @ts-nocheck

/**
 * @name        isString
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isString from '@coffeekraken/sugar/js/is/String'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}
export default isString;
