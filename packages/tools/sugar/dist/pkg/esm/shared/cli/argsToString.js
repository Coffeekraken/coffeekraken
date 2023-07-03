// @ts-nocheck
import __isPlainObject from '../is/isPlainObject';
import __deepMerge from '../object/deepMerge';
import __toString from '../string/toString';
/**
 * @name                  argsToString
 * @namespace            shared.cli
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
 * @snippet         __argsToString($1)
 *
 * @example       js
 * import { __argsToString } from '@coffeekraken/sugar/cli';
 * __argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * });
 * // => -a Hello --myOtherArg World
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// TODO: support deep object structure
// TODO: support required args
export default function __argsToString(args, settings = {}) {
    settings = __deepMerge({
        valueQuote: '"',
        keepFalsy: false,
    }, settings);
    function processParam(param, value) {
        const finalKey = param.length > 1 ? `--${param}` : `-${param}`;
        if (value === true)
            return `${finalKey}`;
        if (value === false && settings.keepFalsy)
            return `${finalKey} false`;
        if (!value)
            return '';
        let valueStr = value.toString !== undefined && typeof value.toString === 'function'
            ? value.toString()
            : __toString(value);
        if (settings.valueQuote === '"')
            valueStr = valueStr.replace(/"/g, '\\"');
        if (settings.valueQuote === "'")
            valueStr = valueStr.replace(/'/g, "\\'");
        if (settings.valueQuote === '`')
            valueStr = valueStr.replace(/`/g, '\\`');
        return `${finalKey} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
    }
    let string = '';
    Object.keys(args).forEach((key) => {
        const argValue = args[key];
        let str = '';
        if (Array.isArray(argValue)) {
            argValue.forEach((value) => {
                string += ` ${processParam(key, value)}`;
            });
        }
        else if (__isPlainObject(argValue)) {
            let valueStr = JSON.stringify(argValue);
            string += ` ${processParam(key, valueStr)}`;
        }
        else {
            string += ` ${processParam(key, argValue)}`;
        }
    });
    return string.replace(/(\s){2,999999}/gm, ' ').trim();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGVBQWUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQStCRztBQUVILHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFFOUIsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RELFFBQVEsR0FBRyxXQUFXLENBQ2xCO1FBQ0ksVUFBVSxFQUFFLEdBQUc7UUFDZixTQUFTLEVBQUUsS0FBSztLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUs7UUFDOUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0QsSUFBSSxLQUFLLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLFNBQVM7WUFBRSxPQUFPLEdBQUcsUUFBUSxRQUFRLENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLFFBQVEsR0FDUixLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVTtZQUNoRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVCLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1lBQzNCLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRztZQUMzQixRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUc7WUFDM0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTdDLE9BQU8sR0FBRyxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pGLENBQUM7SUFFRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTSxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUMvQzthQUFNO1lBQ0gsTUFBTSxJQUFJLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1NBQy9DO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUQsQ0FBQyJ9