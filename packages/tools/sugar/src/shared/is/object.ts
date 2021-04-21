// @ts-nocheck

/**
 * @name        isObject
 * @namespace            js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isObject from '@coffeekraken/sugar/js/is/object'
 * if (isObject({}) {
 *   // do something
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}
export default isObject;
