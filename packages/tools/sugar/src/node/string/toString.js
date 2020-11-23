"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = __importDefault(require("../is/array"));
const boolean_1 = __importDefault(require("../is/boolean"));
const function_1 = __importDefault(require("../is/function"));
const json_1 = __importDefault(require("../is/json"));
const number_1 = __importDefault(require("../is/number"));
const object_1 = __importDefault(require("../is/object"));
const regexp_1 = __importDefault(require("../is/regexp"));
const string_1 = __importDefault(require("../is/string"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SError_1 = __importDefault(require("../error/SError"));
/**
 * @name        toString
 * @namespace           sugar.js.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @param     {Object}      [settings={}]             An object of settings to configure your toString process:
 * - beautify (false) {Boolean}: Specify if you want to beautify the output like objects, arrays, etc...
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toString(value, settings = {}) {
    settings = deepMerge_1.default({
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
    else if (value instanceof SError_1.default) {
        return value.toString();
    }
    else if (value instanceof Error) {
        if (typeof value.toString === 'function') {
            return value.toString();
        }
        return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
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
        let returnVal;
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
exports.default = toString;
