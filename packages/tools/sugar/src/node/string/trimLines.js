// @ts-nocheck
// @shared
import __deepMerge from '../object/deepMerge';
/**
 * @name          trimLines
 * @namespace     sugar.js.string
 * @type          Function
 * @stable
 *
 * This function take a string and trim each lines
 *
 * @param       {String}        string        The string to trim lines of
 * @param       {Object}        [settings={}]     An object settings. Here's the object properties:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpbUxpbmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJpbUxpbmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RDLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsV0FBVyxFQUFFLENBQUM7UUFDZCxZQUFZLEVBQUUsQ0FBQztRQUNmLGNBQWMsRUFBRSxJQUFJO0tBQ3JCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLEdBQUcsTUFBTTtTQUNaLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxRQUFRLENBQUMsV0FBVztZQUN0QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUN0RCxJQUFJLFFBQVEsQ0FBQyxZQUFZO1lBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO1NBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=