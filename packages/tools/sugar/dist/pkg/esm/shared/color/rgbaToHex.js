import __parseRgba from './parseRgba';
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
export default function __rgbaToHex(r, g, b, a = 1) {
    // string support
    if (typeof r === 'string') {
        if (!r.match(/^rgba?\(/)) {
            throw new Error('<red>[rgbaToHex]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)');
        }
        r = __parseRgba(r);
    }
    // object support
    if (typeof r === 'object') {
        r = r.r;
        g = r.g;
        b = r.b;
    }
    return RGBToHex(r, g, b);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3JCLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRW5CLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUM7UUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQztRQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRS9CLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxVQUFVLFdBQVcsQ0FDL0IsQ0FBd0IsRUFDeEIsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFDLEdBQUcsQ0FBQztJQUVMLGlCQUFpQjtJQUNqQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QixNQUFNLElBQUksS0FBSyxDQUNYLDJHQUEyRyxDQUM5RyxDQUFDO1NBQ0w7UUFDRCxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO1FBQ3ZCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNYO0lBRUQsT0FBTyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDIn0=