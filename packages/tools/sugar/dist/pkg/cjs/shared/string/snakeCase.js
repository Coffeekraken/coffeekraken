"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashCase_1 = __importDefault(require("./dashCase"));
// @ts-nocheck
/**
 * @name        snakeCase
 * @namespace            shared.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * snakeCase a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __snakeCase($1)
 *
 * @example     js
 * import { __snakeCase } from '@coffeekraken/sugar/string';
 * __snakeCase('hello world'); // => hello_world
 *
 * @see             https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __snakeCase(text) {
    const dashCase = (0, dashCase_1.default)(text);
    return dashCase.replace(/\-/g, '_');
}
exports.default = __snakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBRXBDLGNBQWM7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixXQUFXLENBQUMsSUFBSTtJQUNwQyxNQUFNLFFBQVEsR0FBRyxJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBSEQsOEJBR0MifQ==