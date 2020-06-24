"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;

/**
 * @name        isString
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @example    js
 * import isString from '@coffeekraken/sugar/js/is/String'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

module.exports = exports.default;