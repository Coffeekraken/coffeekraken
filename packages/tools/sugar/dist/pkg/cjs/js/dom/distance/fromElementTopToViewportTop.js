"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrollTop_1 = __importDefault(require("../scroll/scrollTop"));
const offset_1 = __importDefault(require("../offset/offset"));
/**
 * @name            fromElementTopToViewportTop
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
 * import distanceFromElementTopToViewportTop from '@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop';
 * distanceFromElementTopViewportBottom(myElement); // => 23
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function fromElementTopToViewportTop(elm) {
    const offsets = (0, offset_1.default)(elm);
    const scrollTop = (0, scrollTop_1.default)();
    // @ts-ignore
    return offsets.top - scrollTop;
}
exports.default = fromElementTopToViewportTop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQThDO0FBQzlDLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQXdCLDJCQUEyQixDQUFDLEdBQWdCO0lBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFBLG1CQUFXLEdBQUUsQ0FBQztJQUNoQyxhQUFhO0lBQ2IsT0FBTyxPQUFPLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztBQUNuQyxDQUFDO0FBTEQsOENBS0MifQ==