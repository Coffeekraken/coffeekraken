"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * @name      easeInQuint
 * @namespace     sugar.js.easing
 * @type      Function
 *
 * Ease in quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _default(t) {
  return t * t * t * t * t;
}

module.exports = exports.default;