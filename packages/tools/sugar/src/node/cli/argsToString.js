"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const toString_1 = __importDefault(require("../string/toString"));
const parseArgs_1 = __importDefault(require("./parseArgs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parse_1 = __importDefault(require("../string/parse"));
/**
 * @name                  argsToString
 * @namespace           sugar.js.cli
 * @type                  Function
 * @beta
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
                    valueStr =
                        val.toString !== undefined && typeof val.toString === 'function'
                            ? val.toString()
                            : toString_1.default(val);
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
                valueStr =
                    value.toString !== undefined && typeof value.toString === 'function'
                        ? value.toString()
                        : toString_1.default(value);
                if (defObj.type && defObj.type.toLowerCase() === 'string')
                    valueStr = `"${valueStr}"`;
                // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                    (defObj.type && defObj.type.toLowerCase().includes('array'))) {
                    valueStr = `"${valueStr.split('"').join("'")}"`;
                }
            }
            cliArray.push(`${prefix} ${valueStr}`);
        }
    });
    return cliArray.join(' ').replace(/(\s){2,999999}/gm, ' ');
}
module.exports = argsToString;
//# sourceMappingURL=argsToString.js.map