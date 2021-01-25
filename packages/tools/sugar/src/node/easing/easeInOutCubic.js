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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzZUluT3V0Q3ViaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlYXNlSW5PdXRDdWJpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUNiLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBQ0QsaUJBQVMsSUFBSSxDQUFDIn0=