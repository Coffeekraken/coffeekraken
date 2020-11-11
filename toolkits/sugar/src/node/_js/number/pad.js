"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pad;

/**
 * @name        pad
 * @namespace           sugar.js.number
 * @type      Function
 *
 * Pad a number n of x 0 or another passed character
 *
 * @param    {Number}    number    The number to pad
 * @param    {Integer}    width    The width of pad to apply
 * @param    {String}    [character="0"]    The character to use
 *
 * @example    js
 * import pad from '@coffeekraken/sugar/js/numbers/pad'
 * pad(123, 4) // 0123
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function pad(number, width, character) {
  if (character === void 0) {
    character = '0';
  }

  number = number + '';
  return number.length >= width ? number : new Array(width - number.length + 1).join(character) + number;
}

module.exports = exports.default;