"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrollTop_1 = __importDefault(require("../scroll/scrollTop"));
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
    const scrollTop = (0, scrollTop_1.default)();
    // @ts-ignore
    return offsets.top - scrollTop;
}
exports.default = __distanceFromElementTopToViewportTop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQThDO0FBQzlDLGlEQUErRDtBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQXdCLHFDQUFxQyxDQUN6RCxHQUFnQjtJQUVoQixNQUFNLE9BQU8sR0FBRyxJQUFBLDBCQUFvQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUEsbUJBQVcsR0FBRSxDQUFDO0lBQ2hDLGFBQWE7SUFDYixPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO0FBQ25DLENBQUM7QUFQRCx3REFPQyJ9