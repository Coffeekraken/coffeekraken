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
                if (settings.valueQuote === '"')
                    valueStr = valueStr.replace(/"/g, '\\"');
                if (settings.valueQuote === "'")
                    valueStr = valueStr.replace(/'/g, "\\'");
                if (settings.valueQuote === '`')
                    valueStr = valueStr.replace(/`/g, '\\`');
                string += ` --${key} ${valueStr}`;
            });
        }
        else if (__isPlainObject(argValue)) {
            let valueStr = JSON.stringify(argValue);
            if (settings.valueQuote === '"')
                valueStr = valueStr.replace(/"/g, '\\"');
            if (settings.valueQuote === "'")
                valueStr = valueStr.replace(/'/g, "\\'");
            if (settings.valueQuote === '`')
                valueStr = valueStr.replace(/`/g, '\\`');
            string += ` --${key} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
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
                if (typeof __parse(str) === 'string')
                    if (settings.valueQuote === '"')
                        str = str.replace(/"/g, '\\"');
                if (settings.valueQuote === "'")
                    str = str.replace(/'/g, "\\'");
                if (settings.valueQuote === '`')
                    str = str.replace(/`/g, '\\`');
                str = `${settings.valueQuote}${str}${settings.valueQuote}`;
            }
            string += ` --${key} ${str}`;
        }
    });
    return string.replace(/(\s){2,999999}/gm, ' ');
}
export default argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxzQ0FBc0M7QUFDdEMsOEJBQThCO0FBRTlCLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFVBQVUsRUFBRSxHQUFHO1FBQ2YsU0FBUyxFQUFFLEtBQUs7S0FDbkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN2QixJQUFJLFFBQVEsQ0FBQztnQkFDYixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ2hCLFFBQVEsR0FBRyxFQUFFLENBQUM7aUJBQ2pCO3FCQUFNO29CQUNILFFBQVE7d0JBQ0osS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTOzRCQUM1QixPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVTs0QkFDaEMs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