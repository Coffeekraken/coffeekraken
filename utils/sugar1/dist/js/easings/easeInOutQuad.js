"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Ease in out quad function
 *
 * @name 		easeInOutQuad
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 */
function _default(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

module.exports = exports.default;