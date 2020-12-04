// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/toString", "./parseArgs", "../object/deepMerge", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    var toString_1 = __importDefault(require("../string/toString"));
    var parseArgs_1 = __importDefault(require("./parseArgs"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parse_1 = __importDefault(require("../string/parse"));
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
    function argsToString(args, settings) {
        if (settings === void 0) { settings = {}; }
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
            var string_1 = '';
            Object.keys(args).forEach(function (key) {
                var argValue = args[key];
                var str = '';
                if (Array.isArray(argValue)) {
                    argValue.forEach(function (value) {
                        var valueStr;
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
                                valueStr = "\"" + valueStr + "\"";
                        }
                        string_1 += " --" + key + " " + valueStr;
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
                            str = "\"" + str + "\"";
                    }
                    string_1 += " --" + key + " " + str;
                }
            });
            return string_1.replace(/(\s){2,999999}/gm, ' ');
        }
        var cliArray = [];
        // loop on passed args
        Object.keys(settings.definition).forEach(function (argName) {
            var defObj = settings.definition[argName];
            if (!defObj)
                return;
            if (!settings.includeAllArgs && args[argName] === undefined)
                return;
            var prefix = defObj.alias && settings.alias ? "-" + defObj.alias : "--" + argName;
            var value;
            if (args && args[argName] !== undefined)
                value = args[argName];
            else if (settings.definition[argName] &&
                settings.definition[argName].default)
                value = settings.definition[argName].default;
            if (value === undefined ||
                value === null
            // || (defObj.type.toLowerCase() === 'boolean' && value === false)
            ) {
                return;
            }
            var valueStr;
            if (Array.isArray(value)) {
                value.forEach(function (val) {
                    if (val === true) {
                        valueStr = '';
                    }
                    else {
                        valueStr =
                            val.toString !== undefined && typeof val.toString === 'function'
                                ? val.toString()
                                : toString_1.default(val);
                        if (defObj.type.toLowerCase() === 'string')
                            valueStr = "\"" + valueStr + "\"";
                        // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                        if (defObj.type.toLowerCase().includes('object') ||
                            defObj.type.toLowerCase().includes('array')) {
                            valueStr = "\"" + valueStr.split('"').join("'") + "\"";
                        }
                    }
                    cliArray.push(prefix + " " + valueStr);
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
                    if (defObj.type.toLowerCase() === 'string')
                        valueStr = "\"" + valueStr + "\"";
                    // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                    if (defObj.type.toLowerCase().includes('object') ||
                        defObj.type.toLowerCase().includes('array')) {
                        valueStr = "\"" + valueStr.split('"').join("'") + "\"";
                    }
                }
                cliArray.push(prefix + " " + valueStr);
            }
        });
        return cliArray.join(' ').replace(/(\s){2,999999}/gm, ' ');
    }
    return argsToString;
});
