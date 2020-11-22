"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeInQuint
 * @namespace           sugar.js.easing
 * @type      Function
 *
 * Ease in quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(t) {
    return t * t * t * t * t;
}
exports.default = default_1;
