"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Ease in out quart function
 *
 * @name 		easeInOutQuart
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 */
function _default(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}

module.exports = exports.default;