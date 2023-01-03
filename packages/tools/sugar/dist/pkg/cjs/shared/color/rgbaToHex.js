"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRgba_1 = __importDefault(require("./parseRgba"));
/**
 * @name                rgba2hex
 * @namespace            shared.color
 * @type                Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * RGBA to HEX
 *
 * @param       	{Number|String|Object}        	r	          	The red value between 0-255 or an object representing r, g, b, a or a string representing the rgba(...) color
 * @param       	{Number}        	g	          	The green value between 0-255
 * @param       	{Number}        	b	          	The blue value between 0-255
 * @param       	{Number}        	a	          	The alpha value between 0-100|0-1
 * @return      	{string}		                    The hex string representation like #ff004f
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __rgbaToHex } from '@coffeekraken/sugar/color';
 * __rgbaToHex(10,20,30,10);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1)
        r = '0' + r;
    if (g.length == 1)
        g = '0' + g;
    if (b.length == 1)
        b = '0' + b;
    return '#' + r + g + b;
}
function __rgbaToHex(r, g, b, a = 1) {
    // string support
    if (typeof r === 'string') {
        if (!r.match(/^rgba?\(/)) {
            throw new Error('<red>[rgbaToHex]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)');
        }
        r = (0, parseRgba_1.default)(r);
    }
    // object support
    if (typeof r === 'object') {
        r = r.r;
        g = r.g;
        b = r.b;
    }
    return RGBToHex(r, g, b);
}
exports.default = __rgbaToHex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQXNDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDckIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFbkIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUM7UUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztRQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFFL0IsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQXdCLFdBQVcsQ0FDL0IsQ0FBd0IsRUFDeEIsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFDLEdBQUcsQ0FBQztJQUVMLGlCQUFpQjtJQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUNYLDJHQUEyRyxDQUM5RyxDQUFDO1NBQ0w7UUFDRCxDQUFDLEdBQUcsSUFBQSxtQkFBVyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNYO0lBRUQsT0FBTyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBeEJELDhCQXdCQyJ9