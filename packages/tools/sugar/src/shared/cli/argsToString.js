// @ts-nocheck
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGtFQUE0QztJQUM1Qyw0REFBc0M7SUFDdEMsb0VBQThDO0lBQzlDLDREQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThDRztJQUVILHNDQUFzQztJQUN0Qyw4QkFBOEI7SUFFOUIsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3ZDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLEtBQUssRUFBRSxJQUFJO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLElBQUksR0FBRyxtQkFBVyxDQUFDLElBQUksRUFBRTtnQkFDdkIsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2FBQ2hDLENBQUMsQ0FBQztTQUNKO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDeEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUViLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDM0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUN6QixJQUFJLFFBQVEsQ0FBQzt3QkFDYixJQUFJLEtBQUssS0FB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