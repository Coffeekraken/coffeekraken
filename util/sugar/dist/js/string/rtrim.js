"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rtrim;

/**
 * @name        rtrim
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Trim right a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @return    {String}    The trimed string
 *
 * @example    js
 * import rtrim from '@coffeekraken/sugar/js/string/rtrim'
 * rtrim('Hello World', 'ld') // Hello Wor
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rtrim(string, needle) {
  if (string.substr(needle.length * -1) === needle) {
    return string.substr(0, string.length - needle.length);
  } // nothing to trim


  return string;
}

module.exports = exports.default;