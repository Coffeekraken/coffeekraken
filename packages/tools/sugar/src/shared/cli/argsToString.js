// @ts-nocheck
import __toString from '../string/toString';
import __deepMerge from '../object/deepMerge';
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// TODO: support deep object structure
// TODO: support required args
function argsToString(args, settings = {}) {
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
        let valueStr = value.toString !== undefined &&
            typeof value.toString === 'function'
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
export default argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUU5QyxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxzQ0FBc0M7QUFDdEMsOEJBQThCO0FBRTlCLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFVBQVUsRUFBRSxHQUFHO1FBQ2YsU0FBUyxFQUFFLEtBQUs7S0FDbkIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLO1FBQzlCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQy9ELElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxPQUFPLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDekMsSUFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxTQUFTO1lBQUUsT0FBTyxHQUFHLFFBQVEsUUFBUSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQzNCLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxVQUFVO1lBQ2hDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ2xCLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEMsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUc7WUFDM0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1lBQzNCLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRztZQUMzQixRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFN0MsT0FBTyxHQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakYsQ0FBQztJQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN2QixNQUFNLElBQUksSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLElBQUksWUFBWSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1NBQy9DO2FBQU07WUFDSCxNQUFNLElBQUksSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDL0M7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMxRCxDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==