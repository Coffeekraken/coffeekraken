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
        define(["require", "exports", "../is/array", "../is/boolean", "../is/function", "../is/json", "../is/object", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var array_1 = __importDefault(require("../is/array"));
    var boolean_1 = __importDefault(require("../is/boolean"));
    var function_1 = __importDefault(require("../is/function"));
    var json_1 = __importDefault(require("../is/json"));
    var object_1 = __importDefault(require("../is/object"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    function fn(value, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            beautify: false
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
        // JSON
        if (object_1.default(value) || array_1.default(value) || json_1.default(value)) {
            return JSON.stringify(value, null, settings.beautify ? 4 : 0);
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
