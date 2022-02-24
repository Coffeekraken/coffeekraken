// @ts-nocheck
/**
 * @name        isColor
 * @namespace            js.is
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
 * import isColor from '@coffeekraken/sugar/js/is/color';
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
export default isColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxPQUFPLENBQUMsS0FBVTtJQUN2QixJQUFJO1FBQ0EsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDeEIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQztLQUNyRTtJQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7SUFFZCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU1QyxPQUFPLENBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUNsQyxLQUFLLENBQUMsS0FBSyxDQUNQLDJGQUEyRixDQUM5RjtRQUNELEtBQUssQ0FBQyxLQUFLLENBQ1AsbUVBQW1FLENBQ3RFO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDUCwrRUFBK0UsQ0FDbEY7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUNQLCtFQUErRSxDQUNsRixDQUNKLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==