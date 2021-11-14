// @ts-nocheck

/**
 * @name        isMap
 * @namespace            js.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a js Map
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Map, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isMap from '@coffeekraken/sugar/js/is/map'
 * const map = new Map();
 * if (isMap(map) {
 *   // do something
 * }
 *
 * @since         1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isMap(value) {
    return value instanceof Map;
}
export default isMap;
