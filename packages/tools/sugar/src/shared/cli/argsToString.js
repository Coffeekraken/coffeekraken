"use strict";
// @ts-nocheck
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
 * @param       {Object}      [settings={}]               A settings object to configure your command build process:
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
        if (value === undefined || value === null) {
            return;
        }
        let valueStr;
        if (Array.isArray(value)) {
            value.forEach((val) => {
                if (val === true) {
                    valueStr = '';
                }
                else {
                    valueStr = toString_1.default(val, {
                        beautify: false,
                        hihglight: false
                    });
                    if (defObj.type && defObj.type.toLowerCase() === 'string') {
                        valueStr = `"${valueStr}"`;
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUE0QztBQUM1Qyw0REFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLDREQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUVILHNDQUFzQztBQUN0Qyw4QkFBOEI7QUFFOUIsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLEtBQUssRUFBRSxJQUFJO0tBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLElBQUksR0FBRyxtQkFBVyxDQUFDLElBQUksRUFBRTtZQUN2QixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7U0FDaEMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBRWIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3pCLElBQUksUUFBUSxDQUFDO29CQUNiLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTt3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