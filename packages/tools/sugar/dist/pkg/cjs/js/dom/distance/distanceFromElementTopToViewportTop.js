"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name            distanceFromElementTopToViewportTop
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          betas
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport top in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import { __distanceFromElementTopToViewportTop } from '@coffeekraken/sugar/dom';
 * __distanceFromElementTopToViewportTop(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __distanceFromElementTopToViewportTop(elm) {
    const offsets = (0, dom_1.__offsetFromViewport)(elm);
    const scrollTop = (0, dom_1.__scrollTop)();
    // @ts-ignore
    return offsets.top - scrollTop;
}
exports.default = __distanceFromElementTopToViewportTop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTRFO0FBRTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBd0IscUNBQXFDLENBQ3pELEdBQWdCO0lBRWhCLE1BQU0sT0FBTyxHQUFHLElBQUEsMEJBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBQSxpQkFBVyxHQUFFLENBQUM7SUFDaEMsYUFBYTtJQUNiLE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDbkMsQ0FBQztBQVBELHdEQU9DIn0=