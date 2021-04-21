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
        define(["require", "exports", "../is/node", "chalk", "../object/deepMap", "../is/map", "../is/array", "../is/boolean", "../is/function", "../is/json", "../is/object", "../object/deepMerge", "../map/mapToObject", "cli-highlight", "json-cyclic"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9TdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b1N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBa0M7SUFDbEMsa0RBQTRCO0lBQzVCLGdFQUEwQztJQUMxQyxvREFBZ0M7SUFDaEMsd0RBQW9DO0lBQ3BDLDREQUF3QztJQUN4Qyw4REFBMEM7SUFDMUMsc0RBQWtDO0lBQ2xDLDBEQUFzQztJQUN0QyxvRUFBOEM7SUFDOUMscUVBQTRDO0lBQzVDLGlEQUE0RDtJQUM1RCw2Q0FBc0M7SUFFdEMsOENBQThDO0lBQzlDLGtGQUFrRjtJQUNsRiwrRUFBK0U7SUFFL0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUM5QixRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUk7WUFDYixLQUFLLEVBQUU7Z0JBQ0wsTUFBTSxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUN0QixPQUFPLEVBQUUsZUFBTyxDQUFDLEtBQUs7Z0JBQ3RCLE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtnQkFDckIsTUFBTSxFQUFFLGVBQU8sQ0FBQyxHQUFHO2dCQUNuQixNQUFNLEVBQUUsZUFBTyxDQUFDLFdBQVc7Z0JBQzNCLEtBQUssRUFBRSxlQUFPLENBQUMsTUFBTTtnQkFDckIsUUFBUSxFQUFFLGVBQU8sQ0FBQyxNQUFNO2dCQUN4QixPQUFPLEVBQUUsZUFBTyxDQUFDLElBQUk7Z0JBQ3JCLFFBQVEsRUFBRSxlQUFPLENBQUMsR0FBRztnQkFDckIsSUFBSSxFQUFFLGVBQU8sQ0FBQyxLQUFLO2FBQ3BCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLFNBQVM7UUFDVCxJQUFJLE9BQU8sS0FBSyxLQUFL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