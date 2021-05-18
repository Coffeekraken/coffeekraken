// @ts-nocheck
/**
 * @name        isColor
 * @namespace            js.is
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
export default isColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsT0FBTyxDQUFDLEtBQVU7SUFDekIsSUFBSTtRQUNGLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUM7S0FDbkU7SUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBRWQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUMsT0FBTyxDQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7UUFDbEMsS0FBSyxDQUFDLEtBQUssQ0FDVCwyRkFBMkYsQ0FDNUY7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUNULG1FQUFtRSxDQUNwRTtRQUNELEtBQUssQ0FBQyxLQUFLLENBQ1QsK0VBQStFLENBQ2hGO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDVCwrRUFBK0UsQ0FDaEYsQ0FDRixDQUFDO0FBQ0osQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=