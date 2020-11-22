"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeOutCubic
 * @namespace           sugar.js.easing
 * @type      Function
 *
 * Ease out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(t) {
    return --t * t * t + 1;
}
exports.default = default_1;
