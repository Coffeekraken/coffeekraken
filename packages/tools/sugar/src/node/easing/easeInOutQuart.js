"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeInOutQuart
 * @namespace           sugar.js.easing
 * @type      Function
 *
 * Ease in out quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}
exports.default = default_1;
