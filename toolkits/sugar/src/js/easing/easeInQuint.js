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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (t) {
  return t * t * t * t * t;
}
