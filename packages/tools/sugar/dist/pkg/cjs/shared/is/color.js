"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isColor
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * import isColor from '@coffeekraken/sugar/shared/is/color';
 * isColor('red') => true
 * isColor('#fff') => true
 * isColor('hello') => false
 *
 * @see 		http://stackoverflow.com/questions/6386090/validating-css-color-names
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isColor(value) {
    try {
        const ele = document.createElement('div');
        ele.style.color = value;
        return ele.style.color.split(/\s+/).join('').toLowerCase() !== '';
    }
    catch (e) { }
    if (typeof value !== 'string')
        return false;
    return (value.match(/^#[a-zA-Z0-9]{3,6}$/) ||
        value.match(/^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        value.match(/^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) ||
        value.match(/^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/) ||
        value.match(/^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/));
}
exports.default = isColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsT0FBTyxDQUFDLEtBQVU7SUFDdkIsSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDckU7SUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBRWQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUMsT0FBTyxDQUNILEtBQUssQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDbEMsS0FBSyxDQUFDLEtBQUssQ0FDUCwyRkFBMkYsQ0FDOUY7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUNQLG1FQUFtRSxDQUN0RTtRQUNELEtBQUssQ0FBQyxLQUFLLENBQ1AsK0VBQStFLENBQ2xGO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDUCwrRUFBK0UsQ0FDbEYsQ0FDSixDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9