"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashCase_1 = __importDefault(require("./dashCase"));
// @ts-nocheck
/**
 * @name        snakeCase
 * @namespace            js.string
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
 * @example     js
 * import snakeCase from '@coffeekraken/sugar/js/string/snakeCase';
 * snakeCase('hello world'); // => hello_world
 *
 * @see             https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function snakeCase(text) {
    const dashCase = (0, dashCase_1.default)(text);
    return dashCase.replace(/\-/g, '_');
}
exports.default = snakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQW9DO0FBRXBDLGNBQWM7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtJQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=