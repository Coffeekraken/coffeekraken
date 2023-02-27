"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const mapToObject_1 = __importDefault(require("../convert/mapToObject"));
const isArray_1 = __importDefault(require("../is/isArray"));
const isBoolean_1 = __importDefault(require("../is/isBoolean"));
const isFunction_1 = __importDefault(require("../is/isFunction"));
const isJson_1 = __importDefault(require("../is/isJson"));
const isMap_1 = __importDefault(require("../is/isMap"));
const isObject_1 = __importDefault(require("../is/isObject"));
const deepMap_1 = __importDefault(require("../object/deepMap"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
// import { highlight as __cliHighlight } from 'cli-highlight';
const json_cyclic_1 = require("json-cyclic");
// import __prettyFormat from 'pretty-format';
// import __reactTestPlugin from 'pretty-format/build/plugins/ReactTestComponent';
// import __reactElementPlugin from 'pretty-format/build/plugins/ReactElement';
/**
 * @name        toString
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @snippet         __toString($1)
 *
 * @example    js
 * import { __toString } from '@coffeekraken/sugar/string'
 * __toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function fn(value, settings = {}) {
    settings = (0, deepMerge_1.default)({
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
            attr: chalk_1.default.green,
        },
    }, settings);
    // string
    if (typeof value === 'string')
        return value;
    // null
    if (value === null)
        return null;
    // undefined
    if (value === undefined)
        return undefined;
    // error
    if (value instanceof Error) {
        const errorStr = value.toString();
        const stackStr = value.stack;
        const messageStr = value.message;
        // if (settings.beautify) {
        //   if (__isNode()) {
        //     const __packageRoot = require('../path/packageRootDir').default; // eslint-disable-line
        //     stackStr = stackStr.replace(errorStr, '').trim();
        //     stackStr = stackStr
        //       .split(`${__packageRoot(process.cwd(), {
        //         highest: true
        // }
        //     })}/`)
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
                stackStr,
            ].join('\n');
        }
        return errorStr;
    }
    // Map
    if ((0, isMap_1.default)(value)) {
        value = (0, mapToObject_1.default)(value);
    }
    // JSON
    if ((0, isObject_1.default)(value) || (0, isArray_1.default)(value) || (0, isJson_1.default)(value)) {
        try {
            value = (0, json_cyclic_1.decycle)(value);
        }
        catch (e) { }
        value = (0, deepMap_1.default)(value, ({ value }) => {
            if (value instanceof Map)
                return (0, mapToObject_1.default)(value);
            return value;
        });
        let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
        prettyString = prettyString
            .replace(/"([^"]+)":/g, '$1:')
            .replace(/\uFFFF/g, '\\"');
        if (settings.highlight) {
            // prettyString = __cliHighlight(prettyString, {
            //   language: 'js',
            //   theme: settings.theme
            // });
        }
        return prettyString;
    }
    // boolean
    if ((0, isBoolean_1.default)(value)) {
        if (value)
            return 'true';
        else
            return 'false';
    }
    // function
    if ((0, isFunction_1.default)(value)) {
        return '' + value;
    }
    // stringify
    let returnString = '';
    try {
        value = (0, json_cyclic_1.decycle)(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtEQUE0QjtBQUM1Qix5RUFBZ0Q7QUFDaEQsNERBQXNDO0FBQ3RDLGdFQUEwQztBQUMxQyxrRUFBNEM7QUFDNUMsMERBQW9DO0FBQ3BDLHdEQUFrQztBQUNsQyw4REFBd0M7QUFDeEMsZ0VBQTBDO0FBQzFDLG9FQUE4QztBQUM5QywrREFBK0Q7QUFDL0QsNkNBQXNDO0FBRXRDLDhDQUE4QztBQUM5QyxrRkFBa0Y7QUFDbEYsK0VBQStFO0FBRS9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzVCLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFO1lBQ0gsTUFBTSxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsS0FBSztZQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7WUFDckIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxHQUFHO1lBQ25CLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztZQUMzQixLQUFLLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtZQUNyQixRQUFRLEVBQUUsZUFBTyxDQUFDLEdBQUc7WUFDckIsSUFBSSxFQUFFLGVBQU8sQ0FBQyxLQUFLO1NBQ3RCO0tBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLFNBQVM7SUFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJ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