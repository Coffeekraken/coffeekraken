"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeOutQuad
 * @namespace            shared.easing
 * @type      Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * Ease out quad function
 *
 * @param 		{Number} 		t 		The current time
 * @return 		{Number} 				The value depending on time
 *
 * import { __easeOutQuad } from '@coffeekraken/sugar/easing';
 * __easeOutQuad(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __easeOutQuad(t) {
    return t * (2 - t);
}
exports.default = __easeOutQuad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsYUFBYSxDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUZELGdDQUVDIn0=