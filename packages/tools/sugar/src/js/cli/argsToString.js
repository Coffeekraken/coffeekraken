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
                value === null ||
                (defObj.type &&
                    defObj.type.toLowerCase() === 'boolean' &&
                    value === false)) {
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
                        if (defObj.type && defObj.type.toLowerCase() === 'string')
                            valueStr = "\"" + valueStr + "\"";
                        // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                        if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                            (defObj.type && defObj.type.toLowerCase().includes('array'))) {
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
                    if (defObj.type && defObj.type.toLowerCase() === 'string')
                        valueStr = "\"" + valueStr + "\"";
                    // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                    if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                        (defObj.type && defObj.type.toLowerCase().includes('array'))) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLGdFQUE0QztJQUM1QywwREFBc0M7SUFDdEMsa0VBQThDO0lBQzlDLDBEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThDRztJQUVILHNDQUFzQztJQUN0Qyw4QkFBOEI7SUFFOUIsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsVUFBVSxFQUFFLElBQUk7WUFDaEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsS0FBSyxFQUFFLElBQUk7U0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxHQUFHLG1CQUFXLENBQUMsSUFBSSxFQUFFO2dCQUN2QixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7YUFDaEMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN4QixJQUFJLFFBQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO2dCQUM1QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFFYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQzNCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO3dCQUNyQixJQUFJLFFBQVEsQ0FBQzt3QkFDYixJQUFJLEtBQUssS0FB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