// @ts-nocheck
import * as __convertColors from 'colors-convert';

/**
 * @name              hsl2rgba
 * @namespace            js.color
 * @type              Function
 * @platform          js
 * @platform          node
 * @status          beta
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
 * hsla2rgba(10,20,30);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function hsla2rgba(h, s, l, a = 1) {
    if (typeof h === 'object') {
        h = h.h;
        s = h.s;
        l = h.l;
        a = h.a;
    }

    const rgba = __convertColors.hslaToRgba({
        h,
        s,
        l,
        a,
    });

    return rgba;
}
export default hsla2rgba;
