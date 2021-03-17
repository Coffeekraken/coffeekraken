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
        define(["require", "exports", "chalk", "../object/deepMap", "../is/map", "../is/array", "../is/boolean", "../is/function", "../is/json", "../is/object", "../object/deepMerge", "../map/mapToObject", "cli-highlight", "json-cyclic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chalk_1 = __importDefault(require("chalk"));
    var deepMap_1 = __importDefault(require("../object/deepMap"));
    var map_1 = __importDefault(require("../is/map"));
    var array_1 = __importDefault(require("../is/array"));
    var boolean_1 = __importDefault(require("../is/boolean"));
    var function_1 = __importDefault(require("../is/function"));
    var json_1 = __importDefault(require("../is/json"));
    var object_1 = __importDefault(require("../is/object"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var mapToObject_1 = __importDefault(require("../map/mapToObject"));
    var cli_highlight_1 = require("cli-highlight");
    var json_cyclic_1 = require("json-cyclic");
    // import __prettyFormat from 'pretty-format';
    // import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
    // import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';
    /**
     * @name        toString
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
     *
     * Convert passed value to a string
     *
     * @param    {Mixed}    value    The value to convert to string
     * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
     * - beautify (true) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
     * - highlight (true) {Boolean}: Specify if you want to color highlight the output like objects, arrays, etc...
     * - theme ({}) {Object}: The theme to use to colorize the output. See https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
     * @return    {String}    The resulting string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import toString from '@coffeekraken/sugar/js/string/toString'
     * toString({
     * 	id:'hello'
     * }) // '{"id":"hello"}'
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function fn(value, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            beautify: true,
            highlight: true,
            theme: {
                number: chalk_1.default.yellow,
                default: chalk_1.default.white,
                keyword: chalk_1.default.blue,
                regexp: chalk_1.default.red,
                string: chalk_1.default.whiteBright,
                class: chalk_1.default.yellow,
                function: chalk_1.default.yellow,
                comment: chalk_1.default.gray,
                variable: chalk_1.default.red,
                attr: chalk_1.default.green
            }
        }, settings);
        // string
        if (typeof value === 'string')
            return value;
        // null
        if (value === null)
            return 'null';
        // undefined
        if (value === undefined)
            return 'undefined';
        // error
        if (value instanceof Error) {
            if (typeof value.toString === 'function') {
                return value.toString();
            }
            return value.name + ":\n\n      " + value.message + "\n\n      " + value.stack + "\n    ";
        }
        // Map
        if (map_1.default(value)) {
            value = mapToObject_1.default(value);
        }
        // JSON
        if (object_1.default(value) || array_1.default(value) || json_1.default(value)) {
            try {
                value = json_cyclic_1.decycle(value);
            }
            catch (e) { }
            value = deepMap_1.default(value, function (value, prop, fullPath) {
                if (value instanceof Map)
                    return mapToObject_1.default(value);
                return value;
            });
            var prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
            prettyString = prettyString
                .replace(/"([^"]+)":/g, '$1:')
                .replace(/\uFFFF/g, '\\"');
            if (settings.highlight) {
                prettyString = cli_highlight_1.highlight(prettyString, {
                    language: 'js',
                    theme: settings.theme
                });
            }
            return prettyString;
        }
        // boolean
        if (boolean_1.default(value)) {
            if (value)
                return 'true';
            else
                return 'false';
        }
        // function
        if (function_1.default(value)) {
            return '' + value;
        }
        // stringify
        var returnString = '';
        try {
            value = json_cyclic_1.decycle(value);
            returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
        }
        catch (e) {
            try {
                returnString = value.toString();
            }
            catch (e) {
                returnString = value;
            }
        }
        return returnString;
    }
    exports.default = fn;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zaGFyZWQvc3RyaW5nL3RvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixnREFBNEI7SUFDNUIsOERBQTBDO0lBQzFDLGtEQUFnQztJQUNoQyxzREFBb0M7SUFDcEMsMERBQXdDO0lBQ3hDLDREQUEwQztJQUMxQyxvREFBa0M7SUFDbEMsd0RBQXNDO0lBQ3RDLGtFQUE4QztJQUU5QyxtRUFBNEM7SUFHNUMsK0NBQTREO0lBQzVELDJDQUFzQztJQUV0Qyw4Q0FBOEM7SUFDOUMsa0ZBQWtGO0lBQ2xGLCtFQUErRTtJQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDOUIsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsUUFBUSxFQUFFLElBQUk7WUFDZCxTQUFTLEVBQUUsSUFBSTtZQUNmLEtBQUssRUFBRTtnQkFDTCxNQUFNLEVBQUUsZUFBTyxDQUFDLE1BQU07Z0JBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsS0FBSztnQkFDdEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxJQUFJO2dCQUNyQixNQUFNLEVBQUUsZUFBTyxDQUFDLEdBQUc7Z0JBQ25CLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztnQkFDM0IsS0FBSyxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUNyQixRQUFRLEVBQUUsZUFBTyxDQUFDLE1BQU07Z0JBQ3hCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtnQkFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxHQUFHO2dCQUNyQixJQUFJLEVBQUUsZUFBTyxDQUFDLEtBQUs7YUFDcEI7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsU0FBUztRQUNULElBQUks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