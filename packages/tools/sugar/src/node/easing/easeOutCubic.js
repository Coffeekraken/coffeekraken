"use strict";
// @ts-nocheck
// @shared
/**
 * @name      easeOutCubic
 * @namespace           sugar.js.easing
 * @type      Function
 * @stable
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
module.exports = ease;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFzZU91dEN1YmljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWFzZU91dEN1YmljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsSUFBSSxDQUFDLENBQUM7SUFDYixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxpQkFBUyxJQUFJLENBQUMifQ==