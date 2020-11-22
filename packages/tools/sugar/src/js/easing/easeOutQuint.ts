/**
 * @name      easeOutQuint
 * @namespace           sugar.js.easing
 * @type      Function
 *
 * Ease out quint function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (t) {
  return 1 + --t * t * t * t * t;
}
