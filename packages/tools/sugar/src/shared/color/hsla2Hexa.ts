// @ts-nocheck
import * as __convertColors from 'colors-convert';

/**
 * @name              hsla2hexa
 * @namespace            js.color
 * @type              Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * HSLA to HEX
 *
 * @param	        {Number|Object}        	h		        The hue value between 0-360 or an object representing h, s, l, (a)
 * @param	        {Number}        	s 	        	The saturation value between 0-100|0-1
 * @param	        {Number}        	l 	        	The luminence value between 0-100|0-1
 * @param	        {Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {String} 		                  	The hex string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import hsla2hexa from '@coffeekraken/sugar/js/color/hsla2hexa';
 * hsla2hexa(10,20,30,1);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function hsla2hexa(h, s, l, a = 1) {
    const hex = __convertColors.hslaToHex({
        h,
        s,
        l,
        a: 1,
    });
    console.log('ff');
    return hex;
}
