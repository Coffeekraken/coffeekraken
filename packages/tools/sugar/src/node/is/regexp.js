"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isRegexp
 * @namespace           sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @example    js
 * import isRegexp from '@coffeekraken/sugar/js/is/regexp'
 * if (isRegexp(/^hello$/g) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isRegexp(value) {
    return value && typeof value === 'object' && value.constructor === RegExp;
}
exports.default = isRegexp;
