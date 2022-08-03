"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrollTop_1 = __importDefault(require("../scroll/scrollTop"));
const offset_1 = __importDefault(require("../offset/offset"));
/**
 * @name            fromElementTopToViewportBottom
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
 * import distanceFromElementTopToViewportBottom from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function fromElementTopToViewportBottom(elm) {
    const offsets = (0, offset_1.default)(elm);
    const scrollTop = (0, scrollTop_1.default)();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop;
    return distance;
}
exports.default = fromElementTopToViewportBottom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQThDO0FBQzlDLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQXdCLDhCQUE4QixDQUNsRCxHQUFnQjtJQUVoQixNQUFNLE9BQU8sR0FBRyxJQUFBLGdCQUFRLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsTUFBTSxTQUFTLEdBQUcsSUFBQSxtQkFBVyxHQUFFLENBQUM7SUFDaEMsYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDMUMsTUFBTSxRQUFRLEdBQUcsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBQzFELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFURCxpREFTQyJ9