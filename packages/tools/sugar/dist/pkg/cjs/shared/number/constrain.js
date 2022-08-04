"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        constrain
 * @namespace            js.number
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Constrain a value between a min and a max value
 *
 * @param    {Number}    value    The value to constraint
 * @param    {Number}    [min=null]    The min value possible
 * @param    {Number}    [max=null]    The max value possible
 * @return    {Number}    The constrained value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import constrain from '@coffeekraken/sugar/js/numbers/constrain'
 * constrain(100, 0, 50) // 50
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function constrain(value, min = null, max = null) {
    if (min !== null && value < min)
        value = min;
    if (max !== null && value > max)
        value = max;
    return value;
}
exports.default = constrain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUk7SUFDNUMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssR0FBRyxHQUFHO1FBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUM3QyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLEdBQUc7UUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzdDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==