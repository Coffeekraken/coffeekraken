"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("../is/node"));
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
 * @namespace            js.string
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
        verbose: true,
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
        const errorStr = value.toString();
        let stackStr = value.stack;
        const messageStr = value.message;
        if (settings.beautify) {
            if (node_1.default()) {
                const __packageRoot = require('../../node/path/packageRoot').default; // eslint-disable-line
                stackStr = stackStr.replace(errorStr, '').trim();
                stackStr = stackStr
                    .split(`${__packageRoot(process.cwd(), true)}/`)
                    .join('');
                stackStr = `${stackStr
                    .split('\n')
                    .map((l) => {
                    l.match(/[a-zA-Z-0-9\-_\./]+/gm).forEach((str) => {
                        if (str.match(/\//) && str.match(/\.ts$/))
                            l = l.replace(str, `<blue>${str}</blue>`);
                        else if (str.match(/\//))
                            l = l.replace(str, `<cyan>${str}</cyan>`);
                    });
                    l = l.trim().replace(/^at\s/, '<yellow>at</yellow> ');
                    l = l.replace('->', '<yellow>└-></yellow>');
                    l = l.replace(/:([0-9]{1,29}:[0-9]{1,29})/, `:<yellow>$1</yellow>`);
                    return `<yellow>│</yellow> ${l.trim()}`;
                })
                    .join('\n')}`;
            }
        }
        if (settings.verbose) {
            return [
                `<red>${value.constructor.name || 'Error'}</red>`,
                '',
                messageStr,
                '',
                stackStr
            ].join('\n');
        }
        return errorStr;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxzREFBa0M7QUFDbEMsa0RBQTRCO0FBQzVCLGdFQUEwQztBQUMxQyxvREFBZ0M7QUFDaEMsd0RBQW9DO0FBQ3BDLDREQUF3QztBQUN4Qyw4REFBMEM7QUFDMUMsc0RBQWtDO0FBQ2xDLDBEQUFzQztBQUN0QyxvRUFBOEM7QUFDOUMscUVBQTRDO0FBQzVDLGlEQUE0RDtBQUM1RCw2Q0FBc0M7QUFFdEMsOENBQThDO0FBQzlDLGtGQUFrRjtBQUNsRiwrRUFBK0U7QUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM5QixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxJQUFJO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDdEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtZQUNyQixNQUFNLEVBQUUsZUFBTyxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxXQUFXO1lBQzNCLEtBQUssRUFBRSxlQUFPLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDeEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxJQUFJO1lBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsR0FBRztZQUNyQixJQUFJLEVBQUUsZUFBTyxDQUFDLEtBQUs7U0FDcEI7S0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsU0FBUztJQUNULElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FB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