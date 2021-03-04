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
    Object.defineProperty(exports, "__esModule", { value: true });
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
            if (value === undefined || value === null) {
                return;
            }
            var valueStr;
            if (Array.isArray(value)) {
                value.forEach(function (val) {
                    if (val === true) {
                        valueStr = '';
                    }
                    else {
                        valueStr = toString_1.default(val, {
                            beautify: false,
                            hihglight: false
                        });
                        if (defObj.type && defObj.type.toLowerCase() === 'string') {
                            valueStr = "\"" + valueStr + "\"";
                        }
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
                    valueStr = toString_1.default(value, {
                        beautify: false,
                        hihglight: false
                    });
                    if (defObj.type && defObj.type.toLowerCase() === 'string')
                        valueStr = "\"" + valueStr + "\"";
                    // if (defObj.type.toLowerCase() === 'boolean') valueStr = '';
                    if ((defObj.type && defObj.type.toLowerCase().includes('object')) ||
                        (defObj.type && defObj.type.toLowerCase().includes('array'))) {
                        valueStr = "\"" + valueStr.split('"').join("'") + "\"";
                    }
                }
                // console.log(prefix, valueStr);
                cliArray.push(prefix + " " + valueStr);
            }
        });
        return cliArray.join(' ').replace(/(\s){2,999999}/gm, ' ');
    }
    exports.default = argsToString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixnRUFBNEM7SUFDNUMsMERBQXNDO0lBQ3RDLGtFQUE4QztJQUM5QywwREFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Q0c7SUFFSCxzQ0FBc0M7SUFDdEMsOEJBQThCO0lBRTlCLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ3ZDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksR0FBRyxtQkFBVyxDQUFDLElBQUksRUFBRTtnQkFDdkIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2FBQ2hDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDeEIsSUFBSSxRQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBRWIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUMzQixRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSzt3QkFDckIsSUFBSSxRQUFRLENBQUM7d0JBQ2IsSUFBSSxLQUFLLEtB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