// @ts-nocheck

/**
 * @name      easeOutCubic
 * @namespace            js.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Ease out cubic function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ease(t) {
    return --t * t * t + 1;
}
export default ease;
