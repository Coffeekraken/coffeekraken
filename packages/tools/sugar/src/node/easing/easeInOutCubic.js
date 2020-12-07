"use strict";
// @ts-nocheck
// @shared
/**
 * @name      easeInOutCubic
 * @namespace           sugar.js.easing
 * @type      Function
 * @stable
 *
 * Ease in out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ease(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
module.exports = ease;
//# sourceMappingURL=easeInOutCubic.js.map