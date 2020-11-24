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
        define(["require", "exports", "../is/array", "../is/boolean", "../is/function", "../is/json", "../is/number", "../is/object", "../is/regexp", "../is/string", "../object/deepMerge", "../error/SError"], factory);
    }
})(function (require, exports) {
    "use strict";
    var array_1 = __importDefault(require("../is/array"));
    var boolean_1 = __importDefault(require("../is/boolean"));
    var function_1 = __importDefault(require("../is/function"));
    var json_1 = __importDefault(require("../is/json"));
    var number_1 = __importDefault(require("../is/number"));
    var object_1 = __importDefault(require("../is/object"));
    var regexp_1 = __importDefault(require("../is/regexp"));
    var string_1 = __importDefault(require("../is/string"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var SError_2 = __importDefault(require("../error/SError"));
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
     * - beautify (false) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
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
    function toString(value, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_2.default({
            beautify: false
        }, settings);
        if (string_1.default(value)) {
            return value;
        }
        else if (number_1.default(value)) {
            return value.toString();
        }
        else if (value === null) {
            return 'null';
        }
        else if (value instanceof SError_2.default) {
            return value.toString();
        }
        else if (value instanceof Error) {
            if (typeof value.toString === 'function') {
                return value.toString();
            }
            return value.name + ":\n\n      " + value.message + "\n\n      " + value.stack + "\n    ";
        }
        else if (typeof value === 'symbol' ||
            typeof value === 'typedArray' ||
            value instanceof Date ||
            typeof value === 'color') {
            return value.toString();
        }
        else if (object_1.default(value) || array_1.default(value) || json_1.default(value)) {
            return JSON.stringify(value, null, settings.beautify ? 4 : 0);
        }
        else if (boolean_1.default(value)) {
            if (value)
                return 'true';
            else
                return 'false';
        }
        else if (function_1.default(value)) {
            return '' + value;
        }
        else if (regexp_1.default(value)) {
            return value.toString();
        }
        else if (value === undefined) {
            return 'undefined';
        }
        else {
            var returnVal = void 0;
            try {
                returnVal = JSON.stringify(value, null, settings.beautify ? 4 : 0);
            }
            catch (e) {
                try {
                    returnVal = value.toString();
                }
                catch (e) {
                    return value;
                }
            }
            return returnVal;
        }
    }
    return toString;
});
