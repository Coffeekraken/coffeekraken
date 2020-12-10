"use strict";
// @ts-nocheck
// @shared
/**
 * @name              hsl2rgba
 * @namespace           sugar.js.color
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
module.exports = hsl2rgba;
//# sourceMappingURL=module.js.map