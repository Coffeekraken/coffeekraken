"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Ease out quart function
 *
 * @name 		easeOutQuart
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 */
function _default(t) {
  return 1 - --t * t * t * t;
}

module.exports = exports.default;