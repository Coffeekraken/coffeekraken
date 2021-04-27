// @ts-nocheck
/**
 * @name              hsl2rgba
 * @namespace            js.color
 * @type              Function
 * @stable
 *
 * HSL to RGBA
 *
 * @param	        {Number|Object}        	h		        The hue value between 0-360 or an object representing h, s, l, (a)
 * @param	        {Number}        	s 	        	The saturation value between 0-100|0-1
 * @param	        {Number}        	l 	        	The luminence value between 0-100|0-1
 * @param	        {Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                  	The rgba object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import hsl2rgba from '@coffeekraken/sugar/js/color/hsl2rgba';
 * hsl2rgba(10,20,30);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hsl2rgba(h, s, l, a = 1) {
    if (typeof h === 'object') {
        s = h.s;
        l = h.l;
        a = h.a;
        h = h.h;
    }
    // manage arguments
    h = parseFloat(h);
    s = parseFloat(s);
    l = parseFloat(l);
    a = parseFloat(a);
    if (h > 1)
        h = (1 / 360) * h;
    if (s > 1)
        s = (1 / 100) * s;
    if (l > 1)
        l = (1 / 100) * l;
    if (a > 1)
        a = (1 / 100) * a;
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a: a
    };
}
export default hsl2rgba;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNsMnJnYmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2NvbG9yL2hzbDJyZ2JhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDOUIsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDekIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDVDtJQUVELG1CQUFtQjtJQUNuQixDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDVixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhO0tBQzdCO1NBQU07UUFDTCxNQUFNLE9BQU8sR0FBRyxTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEQsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDOUI7SUFFRCxPQUFPO1FBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN0QixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDdEIsQ0FBQyxFQUFFLENBQUM7S0FDTCxDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=