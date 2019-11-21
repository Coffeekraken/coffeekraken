"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRegexp;

/**
 * Check if the passed value is a js Regexp
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @example    js
 * import isRegexp from 'coffeekraken-sugar/js/utils/is/regexp'
 * if (isRegexp(/^hello$/g) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isRegexp(value) {
  return value && typeof value === "object" && value.constructor === RegExp;
}

module.exports = exports.default;