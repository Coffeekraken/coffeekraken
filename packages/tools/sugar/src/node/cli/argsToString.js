"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toString_1 = __importDefault(require("../string/toString"));
const parseArgs_1 = __importDefault(require("./parseArgs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parse_1 = __importDefault(require("../string/parse"));
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
 * @param       {Object}      [settings={}]               A settings object to configure your command build process:
 * - includeAllArgs (true) {Boolean}: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
 * - alias (true) {Boolean}: Specify if you want to use the aliases or not in the generated command
 * - definition (null) {Object}: Specify a definition object to use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Test}      Testing when no definition is passed
 *
 * @example       js
 * import argsToString from '@coffeekraken/sugar/js/cli/argsToString';
 * argsToString({
 *    arg1: 'Hello',
 *    myOtherArg: 'World'
 * }, {
 *    definition: {
 *      arg1: {
 *        type: 'String',
 *       alias: 'a',
 *       default: 'Plop'
 *     },
 *     myOtherArg: {
 *       type: 'String'
 *     },
 *     lastArg: {
 *       type: 'String',
 *       alias: 'l',
 *       default: 'Nelson'
 *     }
 *  }
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
        definition: null,
        includeAllArgs: true,
        alias: true
    }, settings);
    if (typeof args === 'string') {
        args = parseArgs_1.default(args, {
            definition: settings.definition
        });
    }
    if (!settings.definition) {
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
                                : toString_1.default(value);
                        if (typeof parse_1.default(valueStr) === 'string')
                            valueStr = `"${valueStr}"`;
                    }
                    string += ` --${key} ${valueStr}`;
                });
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
                        str = `"${str}"`;
                }
                string += ` --${key} ${str}`;
            }
        });
        return string.replace(/(\s){2,999999}/gm, ' ');
    }
    const cliArray = [];
    // loop on passed args
    Object.keys(settings.definition).forEach((argName) => {
        const defObj = settings.definition[argName];
        if (!defObj)
            return;
        if (!settings.includeAllArgs && args[argName] === undefined)
            return;
        const prefix = defObj.alias && settings.alias ? `-${defObj.alias}` : `--${argName}`;
        let value;
        if (args && args[argName] !== undefined)
            value = args[argName];
        else if (settings.definition[argName] &&
            settings.definition[argName].default)
            value = settings.definition[argName].default;
        if (value === undefined ||
            value === null ||
            (defObj.type &&
                defObj.type.toLowerCase() === 'boolean' &&
                value === false)) {
            return;
        }
        let valueStr;
        if (Array.isArray(value)) {
            value.forEach((val) => {
                if (val === true) {
                    valueStr = '';
                }
                else {
                    valueStr = toString_1.default(value, {
                        beautify: false,
                        hihglight: false
                    });
                    if (defObj.type && defObj.type.toLowerCase() === 'string')
                        valueStr = `"${valueStr}"`;
                    // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                    if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                        (defObj.type && defObj.type.toLowerCase().includes('array'))) {
                        valueStr = `"${valueStr.split('"').join("'")}"`;
                    }
                }
                cliArray.push(`${prefix} ${valueStr}`);
            });
        }
        else {
            if (value === true) {
                valueStr = '';
            }
            else {
                valueStr = toString_1.default(value, {
                    beautify: false,
                    hihglight: false
                });
                if (defObj.type && defObj.type.toLowerCase() === 'string')
                    valueStr = `"${valueStr}"`;
                // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                    (defObj.type && defObj.type.toLowerCase().includes('array'))) {
                    valueStr = `"${valueStr.split('"').join("'")}"`;
                }
            }
            // console.log(prefix, valueStr);
            cliArray.push(`${prefix} ${valueStr}`);
        }
    });
    return cliArray.join(' ').replace(/(\s){2,999999}/gm, ' ');
}
exports.default = argsToString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixrRUFBNEM7QUFDNUMsNERBQXNDO0FBQ3RDLG9FQUE4QztBQUM5Qyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Q0c7QUFFSCxzQ0FBc0M7QUFDdEMsOEJBQThCO0FBRTlCLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxVQUFVLEVBQUUsSUFBSTtRQUNoQixjQUFjLEVBQUUsSUFBSTtRQUNwQixLQUFLLEVBQUUsSUFBSTtLQUNaLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixJQUFJLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDdkIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1NBQ2hDLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDeEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUViLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN6QixJQUFJLFFBQVEsQ0FBQztvQkFDYixJQUFJLEtBQUssS0FBSyxJ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