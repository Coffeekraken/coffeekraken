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
        define(["require", "exports", "chalk", "../object/deepMap", "../is/map", "../is/array", "../is/boolean", "../is/function", "../is/json", "../is/object", "../object/deepMerge", "../map/mapToObject", "cli-highlight"], factory);
    }
})(function (require, exports) {
    "use strict";
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
    return fn;
});
//# sourceMappingURL=toString.js.map