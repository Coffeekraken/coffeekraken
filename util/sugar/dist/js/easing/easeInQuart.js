"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * @name      easeInQuart
 * @namespace     sugar.js.easing
 * @type      Function
 *
 * Ease in quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _default(t) {
  return t * t * t * t;
}

module.exports = exports.default;