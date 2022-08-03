"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelize_1 = __importDefault(require("./camelize"));
/**
 * @name        camelCase
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * camelCase a string
 *
 * @param         {String}          text        The string to camelCase
 * @return        {String}                      The camelCased string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import camelCase from '@coffeekraken/sugar/js/string/camelCase';
 * camelCase('hello world'); // => helloWorld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function camelCase(text) {
    return (0, camelize_1.default)(text);
}
exports.default = camelCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFvQztBQUVwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO0lBQ25CLE9BQU8sSUFBQSxrQkFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==