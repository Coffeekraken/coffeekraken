"use strict";
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
module.exports = constrain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RyYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RyYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJO0lBQzlDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLEdBQUcsR0FBRztRQUFFLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDN0MsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEtBQUssR0FBRyxHQUFHO1FBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUM3QyxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRCxpQkFBUyxTQUFTLENBQUMifQ==