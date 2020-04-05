"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase64;

/**
 * @name        isBase64
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * import isBase64 from '@coffeekraken/sugar/js/is/base64'
 * if (isBase64(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isBase64(value) {
  if (typeof value !== 'string') return false;

  if (value === '' || value.trim() === '') {
    return false;
  }

  try {
    return btoa(atob(value)) == value;
  } catch (err) {
    return false;
  }
}

module.exports = exports.default;