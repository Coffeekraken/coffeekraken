"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseRgba_1 = __importDefault(require("./parseRgba"));
/**
 * @name                  rgba2hsla
 * @namespace            shared.color
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * RGBA to HSL
 *
 * @param       	{Number|String|Object}        	r 	        	The red value between 0-255 or an object representing r, b, g, a or a string representing the rgba(...) color
 * @param       	{Number}        	g 	        	The green value between 0-255
 * @param       	{Number}        	b 	        	The blue value between 0-255
 * @param       	{Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                    	The hsl object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __rgbaToHsla($1)
 *
 * @example         js
 * import { __rgbaToHsla } from '@coffeekraken/sugar/color';
 * __rgbaToHsla(10,20,50,10);
 *
 * @see         https://www.npmjs.com/package/colors-convert
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function RGBAToHSLA(r, g, b, a) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return { h, s, l, a };
}
function __rgbaToHsla(r, g, b, a = 1) {
    // string support
    if (typeof r === 'string') {
        if (!r.match(/^rgba?\(/)) {
            throw new Error('<red>[rgbaToHsla]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)');
        }
        r = (0, parseRgba_1.default)(r);
    }
    if (typeof r === 'object') {
        g = r.g;
        b = r.b;
        a = r.a;
        r = r.r;
    }
    return RGBAToHSLA(r, g, b, a);
}
exports.default = __rgbaToHsla;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQXNDO0FBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDMUIsa0NBQWtDO0lBQ2xDLENBQUMsSUFBSSxHQUFHLENBQUM7SUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUVULDRDQUE0QztJQUM1QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3hCLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUNuQixDQUFDLEdBQUcsQ0FBQyxFQUNMLENBQUMsR0FBRyxDQUFDLEVBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVWLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsSUFBSSxLQUFLLElBQUksQ0FBQztRQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsYUFBYTtTQUNSLElBQUksSUFBSSxJQUFJLENBQUM7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsZUFBZTtTQUNWLElBQUksSUFBSSxJQUFJLENBQUM7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUM1QyxjQUFjOztRQUNULENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRTdCLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUV2QiwwQ0FBMEM7SUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUFFLENBQUMsSUFBSSxHQUFHLENBQUM7SUFFcEIsc0JBQXNCO0lBQ3RCLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFdEIsdUJBQXVCO0lBQ3ZCLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV2RCwwQkFBMEI7SUFDMUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUxQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQVNELFNBQXdCLFlBQVksQ0FDaEMsQ0FBd0IsRUFDeEIsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFDLEdBQUcsQ0FBQztJQUVMLGlCQUFpQjtJQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUNYLDRHQUE0RyxDQUMvRyxDQUFDO1NBQ0w7UUFDRCxDQUFDLEdBQUcsSUFBQSxtQkFBVyxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDdkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDWDtJQUVELE9BQU8sVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUF4QkQsK0JBd0JDIn0=