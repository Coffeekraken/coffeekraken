"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
/**
 * @name            distanceFromElementTopToViewportBottom
 * @namespace       js.dom.distance
 * @type            Function
 * @platform          js
 * @status          beta
 *
 * This function take an element as parameter and returns you to distance it has
 * from the element top to the viewport bottom in pixels
 *
 * @param       {HTMLElement}       elm             The element you want to get the distance from
 * @return      {Number}                            The calculated distance
 *
 * @example         js
 * import { __distanceFromElementTopToViewportBottom } from '@coffeekraken/sugar/dom';
 * __distanceFromElementTopToViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __distanceFromElementTopToViewportBottom(elm) {
    const offsets = (0, dom_1.__offsetFromViewport)(elm);
    const scrollTop = (0, dom_1.__scrollTop)();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop;
    return distance;
}
exports.default = __distanceFromElementTopToViewportBottom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTRFO0FBRTVFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBd0Isd0NBQXdDLENBQzVELEdBQWdCO0lBRWhCLE1BQU0sT0FBTyxHQUFHLElBQUEsMEJBQW9CLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBQSxpQkFBVyxHQUFFLENBQUM7SUFDaEMsYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDMUMsTUFBTSxRQUFRLEdBQUcsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBQzFELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFURCwyREFTQyJ9