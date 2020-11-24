"use strict";
// @ts-nocheck
/**
 * @name      easeOutQuad
 * @namespace           sugar.js.easing
 * @type      Function
 * @stable
 *
 * Ease out quad function
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
    return t * (2 - t);
}
module.exports = ease;
