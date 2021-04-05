"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parse_1 = __importDefault(require("../string/parse"));
const plainObject_1 = __importDefault(require("../is/plainObject"));
/**
 * @name                  argsToString
 * @namespace           sugar.js.cli
 * @type                  Function
 * @status              beta
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
    settings = deepMerge_1.default({
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
                            : toString_1.default(value);
                    if (typeof parse_1.default(valueStr) === 'string')
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
        else if (plainObject_1.default(argValue)) {
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
                        : toString_1.default(argValue);
                if (typeof parse_1.default(str) === 'string')
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
exports.default = argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUE0QztBQUM1QyxvRUFBOEM7QUFDOUMsNERBQXNDO0FBQ3RDLG9FQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsc0NBQXNDO0FBQ3RDLDhCQUE4QjtBQUU5QixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsVUFBVSxFQUFFLEdBQUc7S0FDaEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN6QixJQUFJLFFBQVEsQ0FBQztnQkFDYixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ2xCLFFBQVEsR0FBRyxFQUFFLENBQUM7aUJBQ2Y7cUJBQU07b0JBQ0wsUUFBUTt3QkFDTixLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVTs0QkFDbEUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7NEJBQ2xCLENBQUMsQ0FBQyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QixJQUFJLE9BQU8sZUFBTyxDQUFD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