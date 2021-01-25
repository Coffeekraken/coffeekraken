"use strict";
// @ts-nocheck
// @shared
/**
 * @name      easeOutQuint
 * @namespace           sugar.js.easing
 * @type      Function
 * @stable
 *
 * Ease out quint function
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
    return 1 + --t * t * t * t * t;
}
module.exports = ease;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzZU91dFF1aW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWFzZU91dFF1aW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDYixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUNELGlCQUFTLElBQUksQ0FBQyJ9