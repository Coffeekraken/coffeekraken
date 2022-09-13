"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name      easeOutCubic
 * @namespace            shared.easing
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
 * import { __easeOutCubic } from '@coffeekraken/sugar/easing';
 * __easeOutCubic(0.4);
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __easeOutCubic(t) {
    return --t * t * t + 1;
}
exports.default = __easeOutCubic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsY0FBYyxDQUFDLENBQUM7SUFDcEMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsaUNBRUMifQ==