"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * Ease in quart function
 *
 * @name 		easeInQuart
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 */
function _default(t) {
  return t * t * t * t;
}

module.exports = exports.default;