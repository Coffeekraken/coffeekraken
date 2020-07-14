"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;

/**
 * @name        isNumber
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is a number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isNumber from '@coffeekraken/sugar/js/is/number';
 * isNumber(12) => true
 * isNumber(22.3) => true
 * isNumber('20') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isNumber(source) {
  return !isNaN(parseFloat(source)) && isFinite(source);
}

module.exports = exports.default;