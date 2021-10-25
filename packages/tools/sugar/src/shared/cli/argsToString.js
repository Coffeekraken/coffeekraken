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
 * @platform          ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBRUgsc0NBQXNDO0FBQ3RDLDhCQUE4QjtBQUU5QixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDckMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxVQUFVLEVBQUUsR0FBRztRQUNmLFNBQVMsRUFBRSxLQUFLO0tBQ25CLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsSUFBSSxRQUFRLENBQUM7Z0JBQ2IsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUNoQixRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNqQjtxQkFBTTtvQkFDSCxRQUFRO3dCQUNKLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUzs0QkFDNUIsT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVU7NEJBQ2hD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