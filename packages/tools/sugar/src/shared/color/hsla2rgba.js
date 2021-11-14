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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNsYTJyZ2JhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaHNsYTJyZ2JhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLEtBQUssZUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQzdCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxNQUFNLElBQUksR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxDQUFDO1FBQ0QsQ0FBQztRQUNELENBQUM7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==