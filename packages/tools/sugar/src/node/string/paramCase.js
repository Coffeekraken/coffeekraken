"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const param_case_1 = require("param-case");
/**
 * @name          paramCase
 * @namespace           sugar.js.string
 * @type          Function
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @example       js
 * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(string) {
    return param_case_1.paramCase(string);
}
exports.default = default_1;
