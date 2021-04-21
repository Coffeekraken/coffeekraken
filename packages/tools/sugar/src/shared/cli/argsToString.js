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
        define(["require", "exports", "../string/toString", "../object/deepMerge", "../string/parse", "../is/plainObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const toString_1 = __importDefault(require("../string/toString"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const parse_1 = __importDefault(require("../string/parse"));
    const plainObject_1 = __importDefault(require("../is/plainObject"));
    /**
     * @name                  argsToString
     * @namespace            js.cli
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGtFQUE0QztJQUM1QyxvRUFBOEM7SUFDOUMsNERBQXNDO0lBQ3RDLG9FQUFnRDtJQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBRUgsc0NBQXNDO0lBQ3RDLDhCQUE4QjtJQUU5QixTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsVUFBVSxFQUFFLEdBQUc7U0FDaEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFYixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDekIsSUFBSSxRQUFRLENBQUM7b0JBQ2IsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUNsQixRQUFRLEdBQUcsRUFBRSxDQUFDO3FCQUNmO3lCQUFNO3dCQUNMLFFBQVE7NEJBQ04sS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVU7Z0NBQ2xFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dDQUNsQixDQUFDLENBQUMsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEIsSUFBSSxPQUFP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