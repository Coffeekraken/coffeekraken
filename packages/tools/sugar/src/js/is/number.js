// @ts-nocheck
// @shared
/**
 * @name        isNumber
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import isNumber from '@coffeekraken/sugar/js/is/number';
 * isNumber(12) => true
 * isNumber(22.3) => true
 * isNumber('20') => false
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isNumber(source) {
    return !isNaN(parseFloat(source)) && isFinite(source);
}
export default isNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsTUFBTTtJQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==