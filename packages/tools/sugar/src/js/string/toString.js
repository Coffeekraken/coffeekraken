"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
        value = json_cyclic_1.decycle(value);
        value = deepMap_1.default(value, (value, prop, fullPath) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsa0RBQTRCO0FBQzVCLGdFQUEwQztBQUMxQyxvREFBZ0M7QUFDaEMsd0RBQW9DO0FBQ3BDLDREQUF3QztBQUN4Qyw4REFBMEM7QUFDMUMsc0RBQWtDO0FBQ2xDLDBEQUFzQztBQUN0QyxvRUFBOEM7QUFFOUMscUVBQTRDO0FBRzVDLGlEQUE0RDtBQUM1RCw2Q0FBc0M7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5QixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxJQUFJO1FBQ2YsS0FBSyxFQUFFO1lBQ0wsTUFBTSxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsS0FBSztZQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7WUFDckIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxHQUFHO1lBQ25CLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztZQUMzQixLQUFLLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtZQUNyQixRQUFRLEVBQUUsZUFBTyxDQUFDLEdBQUc7WUFDckIsSUFBSSxFQUFFLGVBQU8sQ0FBQyxLQUFLO1NBQ3BCO0tBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLFNBQVM7SUFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QyxPQUFPO0lBQ1As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