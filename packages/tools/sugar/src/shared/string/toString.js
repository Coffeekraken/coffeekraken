"use strict";
// @ts-nocheck
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
        // if (settings.beautify) {
        //   if (__isNode()) {
        //     const __packageRoot = require('../path/packageRoot').default; // eslint-disable-line
        //     stackStr = stackStr.replace(errorStr, '').trim();
        //     stackStr = stackStr
        //       .split(`${__packageRoot(process.cwd(), true)}/`)
        //       .join('');
        //     stackStr = `${stackStr
        //       .split('\n')
        //       .map((l) => {
        //         l.match(/[a-zA-Z-0-9\-_\./]+/gm).forEach((str) => {
        //           if (str.match(/\//) && str.match(/\.ts$/))
        //             l = l.replace(str, `<blue>${str}</blue>`);
        //           else if (str.match(/\//))
        //             l = l.replace(str, `<cyan>${str}</cyan>`);
        //         });
        //         l = l.trim().replace(/^at\s/, '<yellow>at</yellow> ');
        //         l = l.replace('->', '<yellow>└-></yellow>');
        //         l = l.replace(/:([0-9]{1,29}:[0-9]{1,29})/, `:<yellow>$1</yellow>`);
        //         return `<yellow>│</yellow> ${l.trim()}`;
        //       })
        //       .join('\n')}`;
        //   }
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFHZCxrREFBNEI7QUFDNUIsZ0VBQTBDO0FBQzFDLG9EQUFnQztBQUNoQyx3REFBb0M7QUFDcEMsNERBQXdDO0FBQ3hDLDhEQUEwQztBQUMxQyxzREFBa0M7QUFDbEMsMERBQXNDO0FBQ3RDLG9FQUE4QztBQUM5QyxxRUFBNEM7QUFDNUMsaURBQTREO0FBQzVELDZDQUFzQztBQUV0Qyw4Q0FBOEM7QUFDOUMsa0ZBQWtGO0FBQ2xGLCtFQUErRTtBQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzlCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRTtZQUNMLE1BQU0sRUFBRSxlQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxlQUFPLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7WUFDM0IsS0FBSyxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsTUFBTTtZQUN4QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7WUFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxHQUFHO1lBQ3JCLElBQUksRUFBRSxlQUFPLENBQUMsS0FBSztTQUNwQjtLQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixTQUFTO0lBQ1QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDNUMs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