// @ts-nocheck
import __deepMerge from '../object/deepMerge';
/**
 * @name          trimLines
 * @namespace            js.string
 * @type          Function
 * @stable
 *
 * This function take a string and trim each lines
 *
 * @param       {String}        string        The string to trim lines of
 * @param       {Object}        [settings={}]     An object settings. Here's the object properties:
 * - leftPadding (0) {Number}: Specify a left padding to set. 1 padding represent 1 space character
 * - rightPadding (0) {Number}: Specify a right padding to set.
 * - keepEmptyLines (true) {Boolean}: Specify if you want to keep empty lines or not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import trimLines from '@coffeekraken/sugar/js/string/trimLines';
 * trimLines(`my cool lines
 *      that have some lines to trim
 * and some not...`);
 * // my cool lines
 * // that have some lines to trim
 * // and some not...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function trimLines(string, settings = {}) {
    settings = __deepMerge({
        leftPadding: 0,
        rightPadding: 0,
        keepEmptyLines: true
    }, settings);
    string = string
        .split('\n')
        .map((line) => {
        line = line.trim();
        if (!settings.keepEmptyLines) {
            if (line === '')
                return -1;
        }
        if (settings.leftPadding)
            line = `${' '.repeat(settings.leftPadding)}${line}`;
        if (settings.rightPadding)
            line = `${line}${' '.repeat(settings.rightPadding)}`;
        return line;
    })
        .filter((line) => line !== -1)
        .join('\n');
    return string;
}
export default trimLines;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbUxpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9zdHJpbmcvdHJpbUxpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdEMsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxXQUFXLEVBQUUsQ0FBQztRQUNkLFlBQVksRUFBRSxDQUFDO1FBQ2YsY0FBYyxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE1BQU0sR0FBRyxNQUFNO1NBQ1osS0FBSyxDQUFDLElBQUksQ0FBQztTQUNYLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUM1QixJQUFJLElBQUksS0FBSyxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLFFBQVEsQ0FBQyxXQUFXO1lBQ3RCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ3RELElBQUksUUFBUSxDQUFDLFlBQVk7WUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFZCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxTQUFTLENBQUMifQ==