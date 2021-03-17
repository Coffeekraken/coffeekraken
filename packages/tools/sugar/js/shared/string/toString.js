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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL3N0cmluZy90b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsZ0RBQTRCO0lBQzVCLDhEQUEwQztJQUMxQyxrREFBZ0M7SUFDaEMsc0RBQW9DO0lBQ3BDLDBEQUF3QztJQUN4Qyw0REFBMEM7SUFDMUMsb0RBQWtDO0lBQ2xDLHdEQUFzQztJQUN0QyxrRUFBOEM7SUFFOUMsbUVBQTRDO0lBRzVDLCtDQUE0RDtJQUM1RCwyQ0FBc0M7SUFFdEMsOENBQThDO0lBQzlDLGtGQUFrRjtJQUNsRiwrRUFBK0U7SUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzlCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLEtBQUs7Z0JBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtnQkFDckIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxHQUFHO2dCQUNuQixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7Z0JBQzNCLEtBQUssRUFBRSxlQUFPLENBQUMsTUFBTTtnQkFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUN4QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7Z0JBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsR0FBRztnQkFDckIsSUFBSSxFQUFFLGVBQU8sQ0FBQyxLQUFLO2FBQ3BCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLFNBQVM7UUFDVCxJQUFJ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