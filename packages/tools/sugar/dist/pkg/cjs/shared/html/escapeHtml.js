"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const escape_html_1 = __importDefault(require("escape-html"));
/**
 * @name            escapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to escape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @snippet         __escapeHtml($1)
 *
 * @example         js
 * import { __escapeHtml } from '@coffeekraken/sugar/html';
 * __escapeHtml('<s-code-example>'); // => &lt;s-code-example&gt;
 *
 * @see             https://www.npmjs.com/package/escape-html
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __escapeHtml(html) {
    // @ts-ignore
    return (0, escape_html_1.default)(html);
}
exports.default = __escapeHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQW1DO0FBRW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsWUFBWSxDQUFDLElBQUk7SUFDckMsYUFBYTtJQUNiLE9BQU8sSUFBQSxxQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFIRCwrQkFHQyJ9