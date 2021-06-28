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
        valueQuote: '"'
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
                        value.toString !== undefined && typeof value.toString === 'function'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBRUgsc0NBQXNDO0FBQ3RDLDhCQUE4QjtBQUU5QixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxVQUFVLEVBQUUsR0FBRztLQUNoQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksUUFBUSxDQUFDO2dCQUNiLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDbEIsUUFBUSxHQUFHLEVBQUUsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxRQUFRO3dCQUNOLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxVQUFVOzRCQUNsRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFB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