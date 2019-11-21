"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Ease out cubic function
 *
 * @name 		easeOutCubic
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 */
function _default(t) {
  return --t * t * t + 1;
}

module.exports = exports.default;