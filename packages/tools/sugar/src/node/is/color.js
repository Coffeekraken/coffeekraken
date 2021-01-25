"use strict";
// @ts-nocheck
// @shared
/**
 * @name        isColor
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a color
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isColor from '@coffeekraken/sugar/js/is/color';
 * isColor('red') => true
 * isColor('#fff') => true
 * isColor('hello') => false
 *
 * @see 		http://stackoverflow.com/questions/6386090/validating-css-color-names
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isColor(value) {
    const ele = document.createElement('div');
    ele.style.color = value;
    return ele.style.color.split(/\s+/).join('').toLowerCase() !== '';
}
module.exports = isColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7QUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxPQUFPLENBQUMsS0FBSztJQUNwQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN4QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3BFLENBQUM7QUFDRCxpQkFBUyxPQUFPLENBQUMifQ==