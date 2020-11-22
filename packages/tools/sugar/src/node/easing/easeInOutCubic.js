"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeInOutCubic
 * @namespace           sugar.js.easing
 * @type      Function
 * Ease in out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
exports.default = default_1;
