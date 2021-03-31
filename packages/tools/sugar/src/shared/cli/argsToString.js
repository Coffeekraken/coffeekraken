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
        define(["require", "exports", "../string/toString", "../object/deepMerge", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const toString_1 = __importDefault(require("../string/toString"));
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
        settings = deepMerge_1.default({}, settings);
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
    exports.default = argsToString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJnc1RvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJnc1RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGtFQUE0QztJQUM1QyxvRUFBOEM7SUFDOUMsNERBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFFSCxzQ0FBc0M7SUFDdEMsOEJBQThCO0lBRTlCLFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUViLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN6QixJQUFJLFFBQVEsQ0FBQztvQkFDYixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7d0JBQ2xCLFFBQVEsR0FBRyxFQUFFLENBQUM7cUJBQ2Y7eUJBQU07d0JBQ0wsUUFBUTs0QkFDTixLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssVUFBVTtnQ0FDbEUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0NBQ2xCLENBQUMsQ0FBQyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QixJQUFJLE9BQU8sZUFBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFFBQVE7NEJBQUUsUUFBUSxHQUFHLElBQUksUUFBUSxHQUFHLENBQUM7cUJBQ3ZFO29CQUNELE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7b0JBQ3JCLEdBQUcsR0FBRyxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0wsR0FBRzt3QkFDRCxRQUFRLENBQUMsUUFBUSxLQUFLLFNBQVM7NEJBQy9CLE9BQU8sUUFBUSxDQUFDLFFBQVEsS0FBSyxVQUFVOzRCQUNyQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTs0QkFDckIsQ0FBQyxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzNCLElBQUksT0FBTyxlQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTt3QkFBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDeEQ7Z0JBQ0QsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELGtCQUFlLFlBQVksQ0FBQyJ9