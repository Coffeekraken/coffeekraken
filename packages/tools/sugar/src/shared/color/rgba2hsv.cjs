"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            rgba2hsv
 * @namespace            js.color
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmdiYTJoc3YuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2NvbG9yL3JnYmEyaHN2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUM5QixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN6QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNUO0lBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN2QixLQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNwQixJQUFJLENBQUMsRUFDSCxDQUFDLEVBQ0QsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUVWLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLElBQUksR0FBRyxJQUFJLENBQUM7UUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUM3QztRQUNILFFBQVE7UUFDUixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNsQjtJQUVELElBQUksQ0FBQyxJQUFJLEdBQUc7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLDJCQUEyQjtTQUN0QixJQUFJLENBQUMsSUFBSSxHQUFHO1FBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDM0Msd0JBQXdCOztRQUNuQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLHlCQUF5QjtJQUV2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVO0lBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxDQUFDLElBQUksR0FBRyxDQUFDO0lBRXBCLE9BQU87UUFDTCxDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO1FBQ0osQ0FBQyxFQUFFLENBQUM7S0FDTCxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFlLFFBQVEsQ0FBQyJ9