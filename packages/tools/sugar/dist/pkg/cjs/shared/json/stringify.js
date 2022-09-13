"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
// import { decycle } from 'json-cyclic';
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
/**
 * @name            stringify
 * @namespace            shared.json
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function do the same as the ```JSON.stringify``` one but add some features.
 *
 * @feature       2.0.0         Remove circular dependencies by default
 *
 * @param         {Object}        obj       The object to stringify
 * @param         {Function}    [replacer=null]       A function that alters the behavior of the stringification process.
 * @param         {Number}      [space=null]      The number of spaces you want tp use
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import { __stringify } from '@coffeekraken/sugar/json';
 * __stringify({
 *    hello: 'world'
 * }); // => {"hello":"world"}
 *
 * @see         https://www.npmjs.com/package/fast-safe-stringify
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stringify(obj, replacer = null, space = null) {
    return (0, fast_safe_stringify_1.default)(obj, replacer, space);
}
exports.default = stringify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHlDQUF5QztBQUN6Qyw4RUFBOEM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJO0lBQ2hFLE9BQU8sSUFBQSw2QkFBVyxFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0MsQ0FBQztBQUZELDRCQUVDIn0=