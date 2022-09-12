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
    if ((0, map_1.default)(value)) {
        value = (0, mapToObject_1.default)(value);
    }
    // JSON
    if ((0, object_1.default)(value) || (0, array_1.default)(value) || (0, json_1.default)(value)) {
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
    if ((0, boolean_1.default)(value)) {
        if (value)
            return 'true';
        else
            return 'false';
    }
    // function
    if ((0, function_1.default)(value)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLGtEQUE0QjtBQUM1QixnRUFBMEM7QUFDMUMsb0RBQWdDO0FBQ2hDLHdEQUFvQztBQUNwQyw0REFBd0M7QUFDeEMsOERBQTBDO0FBQzFDLHNEQUFrQztBQUNsQywwREFBc0M7QUFDdEMsb0VBQThDO0FBQzlDLHFFQUE0QztBQUM1QywrREFBK0Q7QUFDL0QsNkNBQXNDO0FBRXRDLDhDQUE4QztBQUM5QyxrRkFBa0Y7QUFDbEYsK0VBQStFO0FBRS9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM1QixRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUNsQjtRQUNJLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLEtBQUssRUFBRTtZQUNILE1BQU0sRUFBRSxlQUFPLENBQUMsTUFBTTtZQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxJQUFJO1lBQ3JCLE1BQU0sRUFBRSxlQUFPLENBQUMsR0FBRztZQUNuQixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7WUFDM0IsS0FBSyxFQUFFLGVBQU8sQ0FBQyxNQUFNO1lBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsTUFBTTtZQUN4QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7WUFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxHQUFHO1lBQ3JCLElBQUksRUFBRSxlQUFPLENBQUMsS0FBSztTQUN0QjtLQUNKLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixTQUFTO0lBQ1QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFD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