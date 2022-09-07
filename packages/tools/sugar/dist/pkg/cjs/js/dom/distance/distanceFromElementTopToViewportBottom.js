"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrollTop_1 = __importDefault(require("../scroll/scrollTop"));
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
    const scrollTop = (0, scrollTop_1.default)();
    // @ts-ignore
    const viewportHeight = window.innerHeight;
    const distance = viewportHeight - offsets.top + scrollTop;
    return distance;
}
exports.default = __distanceFromElementTopToViewportBottom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQThDO0FBQzlDLGlEQUErRDtBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQXdCLHdDQUF3QyxDQUM1RCxHQUFnQjtJQUVoQixNQUFNLE9BQU8sR0FBRyxJQUFBLDBCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUEsbUJBQVcsR0FBRSxDQUFDO0lBQ2hDLGFBQWE7SUFDYixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQzFDLE1BQU0sUUFBUSxHQUFHLGNBQWMsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztJQUMxRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBVEQsMkRBU0MifQ==