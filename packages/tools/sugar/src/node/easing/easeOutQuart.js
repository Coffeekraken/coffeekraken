"use strict";
// @ts-nocheck
// @shared
/**
 * @name      easeOutQuart
 * @namespace           sugar.js.easing
 * @type      Function
 * @stable
 *
 * Ease out quart function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ease(t) {
    return 1 - --t * t * t * t;
}
module.exports = ease;
//# sourceMappingURL=easeOutQuart.js.map