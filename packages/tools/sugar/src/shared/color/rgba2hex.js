// @ts-nocheck
import * as __convertColors from 'colors-convert';
/**
 * @name                rgba2hex
 * @namespace            js.color
 * @type                Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * RGBA to HEX
 *
 * @param       	{Number|Object}        	r	          	The red value between 0-255 or an object representing r, g, b, a
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
 * import rgba2hex from '@coffeekraken/sugar/js/color/rgba2hex';
 * rgba2hex(10,20,30,10);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function rgba2hex(r, g, b, a = 1) {
    if (typeof r === 'object') {
        g = r.g;
        b = r.b;
        a = r.a;
        r = r.r;
    }
    let res = __convertColors.rgbaToHex({
        r,
        g,
        b,
        a,
    });
    if (res.length === 9) {
        res = res.slice(0, -2);
    }
    return res;
}
export default rgba2hex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmdiYTJoZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZ2JhMmhleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxLQUFLLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUM1QixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNYO0lBRUQsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QsQ0FBQztRQUNELENBQUM7UUFDRCxDQUFDO0tBQ0osQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=