"use strict";
// @ts-nocheck
// @shared
/**
 * @name        isArray
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a js Array
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Array, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isArray from '@coffeekraken/sugar/js/is/array'
 * if (isArray([]) {
 *   // do something
 * }
 *
 * @since      1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
}
module.exports = isArray;
