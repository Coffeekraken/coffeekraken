"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
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
    settings = (0, deepMerge_1.default)({
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
            : (0, toString_1.default)(value);
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
        else if ((0, plainObject_1.default)(argValue)) {
            let valueStr = JSON.stringify(argValue);
            string += ` ${processParam(key, valueStr)}`;
        }
        else {
            string += ` ${processParam(key, argValue)}`;
        }
    });
    return string.replace(/(\s){2,999999}/gm, ' ').trim();
}
exports.default = argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUE0QztBQUM1QyxvRUFBOEM7QUFFOUMsb0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFFOUIsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3JDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksVUFBVSxFQUFFLEdBQUc7UUFDZixTQUFTLEVBQUUsS0FBSztLQUNuQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUs7UUFDOUIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0QsSUFBSSxLQUFLLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUN6QyxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksUUFBUSxDQUFDLFNBQVM7WUFBRSxPQUFPLEdBQUcsUUFBUSxRQUFRLENBQUM7UUFDdEUsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVM7WUFDM0IsT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVU7WUFDaEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDbEIsQ0FBQyxDQUFDLElBQUEsa0JBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUV4QyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRztZQUMzQixRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUc7WUFDM0IsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1lBQzNCLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU3QyxPQUFPLEdBQUcsUUFBUSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqRixDQUFDO0lBRUQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZCLE1BQU0sSUFBSSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU0sSUFBSSxJQUFBLHFCQUFlLEVBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksSUFBSSxZQUFZLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDL0M7YUFBTTtZQUNILE1BQU0sSUFBSSxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUMvQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzFELENBQUM7QUFDRCxrQkFBZSxZQUFZLENBQUMifQ==