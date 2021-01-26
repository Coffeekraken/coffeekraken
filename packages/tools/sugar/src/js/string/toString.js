"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7QUFFVixrREFBNEI7QUFDNUIsZ0VBQTBDO0FBQzFDLG9EQUFnQztBQUNoQyx3REFBb0M7QUFDcEMsNERBQXdDO0FBQ3hDLDhEQUEwQztBQUMxQyxzREFBa0M7QUFDbEMsMERBQXNDO0FBQ3RDLG9FQUE4QztBQUU5QyxxRUFBNEM7QUFHNUMsaURBQTREO0FBQzVELDZDQUFzQztBQUV0Qyw4Q0FBOEM7QUFDOUMsa0ZBQWtGO0FBQ2xGLCtFQUErRTtBQUUvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzlCLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLFFBQVEsRUFBRSxJQUFJO1FBQ2QsU0FBUyxFQUFFLElBQUk7UUFDZixLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDdEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtZQUNyQixNQUFNLEVBQUUsZUFBTyxDQUFDLEdBQUc7WUFDbkIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxXQUFXO1lBQzNCLEtBQUssRUFBRSxlQUFPLENBQUMsTUFBTTtZQUNyQixRQUFRLEVBQUUsZUFBTyxDQUFDLE1BQU07WUFDeEIsT0FBTyxFQUFFLGVBQU8sQ0FBQyxJQUFJO1lBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsR0FBRztZQUNyQixJQUFJLEVBQUUsZUFBTyxDQUFDLEtBQUs7U0FDcEI7S0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsU0FBUztJQUNULElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzVDLE9BQU87SUFDUCxJQUFJLEtBQUssS0FBSyxJQUFJO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFDbEMsWUFBWTtJQUNaLElBQUksS0FBSyxLQUFLLFNBQVM7UUFBRSxPQUFPLFdBQVcsQ0FBQztJQUM1QyxRQUFRO0lBQ1IsSUFBSSxLQUFLLFlBQVksS0FBSyxFQUFFO1FBQzFCLElBQUksT0FBTyxLQUFLLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUN4QyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN6QjtRQUNELE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSTs7UUFFaEIsS0FBSyxDQUFDLE9BQU87O1FBRWIsS0FBSyxDQUFDLEtBQUs7S0FDZCxDQUFDO0tBQ0g7SUFFRCxNQUFNO0lBQ04sSUFBSSxhQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbEIsS0FBSyxHQUFHLHFCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7SUFFRCxPQUFPO0lBQ1AsSUFBSSxnQkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLGVBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxjQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDNUQsS0FBSyxHQUFHLHFCQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsS0FBSyxHQUFHLGlCQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNqRCxJQUFJLEtBQUssWUFBWSxHQUFHO2dCQUFFLE9BQU8scUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUUsWUFBWSxHQUFHLFlBQVk7YUFDeEIsT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUM7YUFDN0IsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEIsWUFBWSxHQUFHLHlCQUFjLENBQUMsWUFBWSxFQUFFO2dCQUMxQyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7YUFDdEIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLFlBQVksQ0FBQztLQUNyQjtJQUNELFVBQVU7SUFDVixJQUFJLGlCQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxLQUFLO1lBQUUsT0FBTyxNQUFNLENBQUM7O1lBQ3BCLE9BQU8sT0FBTyxDQUFDO0tBQ3JCO0lBQ0QsV0FBVztJQUNYLElBQUksa0JBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN2QixPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUM7S0FDbkI7SUFDRCxZQUFZO0lBQ1osSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLElBQUk7UUFDRixLQUFLLEdBQUcscUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdkU7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLElBQUk7WUFDRixZQUFZLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQ3RCO0tBQ0Y7SUFDRCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBQ0QsaUJBQVMsRUFBRSxDQUFDIn0=