// @ts-nocheck
// @shared
/**
 * @name        constrain
 * @namespace           sugar.js.number
 * @type      Function
 * @stable
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function constrain(value, min = null, max = null) {
    if (min !== null && value < min)
        value = min;
    if (max !== null && value > max)
        value = max;
    return value;
}
export default constrain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RyYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RyYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUk7SUFDOUMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssR0FBRyxHQUFHO1FBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUM3QyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLEdBQUc7UUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzdDLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=