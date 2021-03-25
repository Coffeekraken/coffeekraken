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
        define(["require", "exports", "chalk", "../object/deepMap", "../is/map", "../is/array", "../is/boolean", "../is/function", "../is/json", "../is/object", "../object/deepMerge", "../map/mapToObject", "cli-highlight", "json-cyclic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    const deepMap_1 = __importDefault(require("../object/deepMap"));
    const map_1 = __importDefault(require("../is/map"));
    const array_1 = __importDefault(require("../is/array"));
    const boolean_1 = __importDefault(require("../is/boolean"));
    const function_1 = __importDefault(require("../is/function"));
    const json_1 = __importDefault(require("../is/json"));
    const object_1 = __importDefault(require("../is/object"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const mapToObject_1 = __importDefault(require("../map/mapToObject"));
    const cli_highlight_1 = require("cli-highlight");
    const json_cyclic_1 = require("json-cyclic");
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
    function fn(value, settings = {}) {
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
            return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
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
            value = deepMap_1.default(value, ({ value }) => {
                if (value instanceof Map)
                    return mapToObject_1.default(value);
                return value;
            });
            let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
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
        let returnString = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrREFBNEI7SUFDNUIsZ0VBQTBDO0lBQzFDLG9EQUFnQztJQUNoQyx3REFBb0M7SUFDcEMsNERBQXdDO0lBQ3hDLDhEQUEwQztJQUMxQyxzREFBa0M7SUFDbEMsMERBQXNDO0lBQ3RDLG9FQUE4QztJQUM5QyxxRUFBNEM7SUFDNUMsaURBQTREO0lBQzVELDZDQUFzQztJQUV0Qyw4Q0FBOEM7SUFDOUMsa0ZBQWtGO0lBQ2xGLCtFQUErRTtJQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzlCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLEtBQUs7Z0JBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtnQkFDckIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxHQUFHO2dCQUNuQixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7Z0JBQzNCLEtBQUssRUFBRSxlQUFPLENBQUMsTUFBTTtnQkFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUN4QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7Z0JBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsR0FBRztnQkFDckIsSUFBSSxFQUFFLGVBQU8sQ0FBQyxLQUFLO2FBQ3BCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLFNBQVM7UUFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM1QyxP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