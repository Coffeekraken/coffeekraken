"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const mapToObject_js_1 = __importDefault(require("../convert/mapToObject.js"));
const isArray_js_1 = __importDefault(require("../is/isArray.js"));
const isBoolean_js_1 = __importDefault(require("../is/isBoolean.js"));
const isFunction_js_1 = __importDefault(require("../is/isFunction.js"));
const isJson_js_1 = __importDefault(require("../is/isJson.js"));
const isMap_js_1 = __importDefault(require("../is/isMap.js"));
const isObject_js_1 = __importDefault(require("../is/isObject.js"));
const deepMap_js_1 = __importDefault(require("../object/deepMap.js"));
const deepMerge_js_1 = __importDefault(require("../object/deepMerge.js"));
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
    settings = (0, deepMerge_js_1.default)({
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
    if ((0, isMap_js_1.default)(value)) {
        value = (0, mapToObject_js_1.default)(value);
    }
    // JSON
    if ((0, isObject_js_1.default)(value) || (0, isArray_js_1.default)(value) || (0, isJson_js_1.default)(value)) {
        try {
            value = (0, json_cyclic_1.decycle)(value);
        }
        catch (e) { }
        value = (0, deepMap_js_1.default)(value, ({ value }) => {
            if (value instanceof Map)
                return (0, mapToObject_js_1.default)(value);
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
    if ((0, isBoolean_js_1.default)(value)) {
        if (value)
            return 'true';
        else
            return 'false';
    }
    // function
    if ((0, isFunction_js_1.default)(value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtEQUE0QjtBQUM1QiwrRUFBbUQ7QUFDbkQsa0VBQXlDO0FBQ3pDLHNFQUE2QztBQUM3Qyx3RUFBK0M7QUFDL0MsZ0VBQXVDO0FBQ3ZDLDhEQUFxQztBQUNyQyxvRUFBMkM7QUFDM0Msc0VBQTZDO0FBQzdDLDBFQUFpRDtBQUNqRCwrREFBK0Q7QUFDL0QsNkNBQXNDO0FBRXRDLDhDQUE4QztBQUM5QyxrRkFBa0Y7QUFDbEYsK0VBQStFO0FBRS9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0JHO0FBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzVCLFFBQVEsR0FBRyxJQUFBLHNCQUFXLEVBQ2xCO1FBQ0ksUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFO1lBQ0gsTUFBTSxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsS0FBSztZQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7WUFDckIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxHQUFHO1lBQ25CLE1BQU0sRUFBRSxlQUFPLENBQUMsV0FBVztZQUMzQixLQUFLLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtZQUNyQixRQUFRLEVBQUUsZUFBTyxDQUFDLEdBQUc7WUFDckIsSUFBSSxFQUFFLGVBQU8sQ0FBQyxLQUFLO1NBQ3RCO0tBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLFNBQVM7SUFDVCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJ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