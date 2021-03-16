"use strict";
// @ts-nocheck
// @shared
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            rgba2hsv
 * @namespace           sugar.js.color
 * @type            Function
 * @stable
 *
 * RGBA to HSV
 *
 * @param       	{Number|Object}        	r 	          	The red value between 0-255 or an object representing r, g, b, a
 * @param       	{Number}        	g 	          	The green value between 0-255
 * @param       	{Number}        	b 	          	The blue value between 0-255
 * @param       	{Number}        	a 	          	The alpha value between 0-100|0-1
 * @return      	{object} 		                    	The hsv object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import rgba2hsv from '@coffeekraken/sugar/js/color/rgba2hsv';
 * rgba2hsv(10,20,50,10);
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rgba2hsv(r, g, b, a = 1) {
    if (typeof r === 'object') {
        g = r.g;
        b = r.b;
        a = r.a;
        r = r.r;
    }
    const min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min;
    let h, s, v = max;
    v = Math.floor((max / 255) * 100);
    if (max != 0)
        s = Math.floor((delta / max) * 100);
    else {
        // black
        return [0, 0, 0];
    }
    if (r == max)
        h = (g - b) / delta;
    // between yellow & magenta
    else if (g == max)
        h = 2 + (b - r) / delta;
    // between cyan & yellow
    else
        h = 4 + (r - g) / delta; // between magenta & cyan
    h = Math.floor(h * 60); // degrees
    if (h < 0)
        h += 360;
    return {
        h: h,
        s: s,
        v: v
    };
}
exports.default = rgba2hsv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmdiYTJoc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2NvbG9yL3JnYmEyaHN2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDOUIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDekIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDVDtJQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDdkIsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQ0gsQ0FBQyxFQUNELENBQUMsR0FBRyxHQUFHLENBQUM7SUFFVixDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDN0M7UUFDSCxRQUFRO1FBQ1IsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEI7SUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHO1FBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNsQywyQkFBMkI7U0FDdEIsSUFBSSxDQUFDLElBQUksR0FBRztRQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzNDLHdCQUF3Qjs7UUFDbkIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyx5QkFBeUI7SUFFdkQsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVTtJQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUVwQixPQUFPO1FBQ0wsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0wsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSxRQUFRLENBQUMifQ==