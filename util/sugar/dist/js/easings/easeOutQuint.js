"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Ease out quint function
 *
 * @name 		easeOutQuint
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 */
function _default(t) {
  return 1 + --t * t * t * t * t;
}

module.exports = exports.default;