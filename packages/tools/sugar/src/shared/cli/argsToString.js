// @ts-nocheck
import __toString from '../string/toString';
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __isPlainObject from '../is/plainObject';
/**
 * @name                  argsToString
 * @namespace            js.cli
 * @type                  Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function take a simple object, a definition object and return you the string version that you can pass
 * directly to the command line interface
 *
 * @param       {Object}        args        The arguments object
 * @param       {Object}      [settings={}]               A settings object to configure your command build process
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Test}      Testing when no definition is passed
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/shared/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * });
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO: support deep object structure
// TODO: support required args
function argsToString(args, settings = {}) {
    settings = __deepMerge({
        valueQuote: '"',
        keepFalsy: false,
    }, settings);
    let string = '';
    Object.keys(args).forEach((key) => {
        const argValue = args[key];
        let str = '';
        let finalKey = key;
        if (!isNaN(key))
            finalKey = '';
        else if (finalKey.length <= 1)
            finalKey = `-${key}`;
        else
            finalKey = `--${finalKey}`;
        if (Array.isArray(argValue)) {
            argValue.forEach((value) => {
                let valueStr;
                if (value === true) {
                    valueStr = '';
                }
                else {
                    valueStr =
                        value.toString !== undefined &&
                            typeof value.toString === 'function'
                            ? value.toString()
                            : __toString(value);
                    if (typeof __parse(valueStr) === 'string')
                        valueStr = `"${valueStr}"`;
                }
                if (valueStr.split(' ').length < 1) {
                    if (settings.valueQuote === '"')
                        valueStr = valueStr.replace(/"/g, '\\"');
                    if (settings.valueQuote === "'")
                        valueStr = valueStr.replace(/'/g, "\\'");
                    if (settings.valueQuote === '`') {
                        valueStr = valueStr.replace(/`/g, '\\`');
                    }
                }
                string += ` ${finalKey} ${valueStr}`;
            });
        }
        else if (__isPlainObject(argValue)) {
            let valueStr = JSON.stringify(argValue);
            if (valueStr.split(' ').length < 1) {
                if (settings.valueQuote === '"')
                    valueStr = valueStr.replace(/"/g, '\\"');
                if (settings.valueQuote === "'")
                    valueStr = valueStr.replace(/'/g, "\\'");
                if (settings.valueQuote === '`')
                    valueStr = valueStr.replace(/`/g, '\\`');
            }
            string += ` ${finalKey} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
        }
        else {
            if (argValue === false) {
                if (!settings.keepFalsy)
                    return;
                str = 'false';
            }
            if (argValue === true) {
                str = '';
            }
            else {
                str =
                    argValue.toString !== undefined &&
                        typeof argValue.toString === 'function'
                        ? argValue.toString()
                        : __toString(argValue);
                if (typeof __parse(str) === 'string' && str.split(' ').length > 1) {
                    if (settings.valueQuote === '"')
                        str = str.replace(/"/g, '\\"');
                    if (settings.valueQuote === "'")
                        str = str.replace(/'/g, "\\'");
                    if (settings.valueQuote === '`')
                        str = str.replace(/`/g, '\\`');
                }
                if (str.split(' ').length < 1) {
                    str = `${settings.valueQuote}${str}${settings.valueQuote}`;
                }
            }
            string += ` ${finalKey} ${str}`;
        }
    });
    return string.replace(/(\s){2,999999}/gm, ' ');
}
export default argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxzQ0FBc0M7QUFDdEMsOEJBQThCO0FBRTlCLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFVBQVUsRUFBRSxHQUFHO1FBQ2YsU0FBUyxFQUFFLEtBQUs7S0FDbkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDO2FBQzFCLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O1lBQy9DLFFBQVEsR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBRWhDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixRQUFRLENBQUMsT0FBTyxDQUFD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