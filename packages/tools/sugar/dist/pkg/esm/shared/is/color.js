// @ts-nocheck
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
export default isColor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFVO0lBQ3ZCLElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN4QixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDO0tBQ3JFO0lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtJQUVkLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTVDLE9BQU8sQ0FDSCxLQUFLLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQ1AsMkZBQTJGLENBQzlGO1FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FDUCxtRUFBbUUsQ0FDdEU7UUFDRCxLQUFLLENBQUMsS0FBSyxDQUNQLCtFQUErRSxDQUNsRjtRQUNELEtBQUssQ0FBQyxLQUFLLENBQ1AsK0VBQStFLENBQ2xGLENBQ0osQ0FBQztBQUNOLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9