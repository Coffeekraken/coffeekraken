"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

/**
 * Check if the passed value is a js object
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @example    js
 * import isObject from '@coffeekraken/sugar/js/utils/is/object'
 * if (isObject({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

module.exports = exports.default;