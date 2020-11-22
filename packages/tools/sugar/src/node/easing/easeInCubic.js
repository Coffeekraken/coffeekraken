"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeInCubic
 * @namespace           sugar.js.easing
 * @type      Function
 *
 * Ease in cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(t) {
    return t * t * t;
}
exports.default = default_1;
