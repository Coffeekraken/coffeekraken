// @ts-nocheck

/**
 * @name      easeInQuad
 * @namespace            js.easing
 * @type      Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status          beta
 *
 * Ease in quad function
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
  return t * t;
}
export default ease;
