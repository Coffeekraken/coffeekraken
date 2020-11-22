"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeInOutQuint
 * @namespace           sugar.js.easing
 * @type      Function
 * Ease in out quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}
exports.default = default_1;
