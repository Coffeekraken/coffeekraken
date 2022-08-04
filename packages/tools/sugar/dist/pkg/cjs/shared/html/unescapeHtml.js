"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unescape_1 = __importDefault(require("unescape"));
/**
 * @name            unescapeHtml
 * @namespace       shared.html
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to unescape some html characters like &lt;, etc...
 *
 * @param       {String}            html            The html to unescape
 * @return      {String}                            The unescaped html
 *
 * @example         js
 * import unescapeHtml from '@coffeekraken/sugar/shared/html/unescapeHtml';
 * unescapeHtml('&lt;s-code-example&gt;'); // => <s-code-example>
 *
 * @see             https://www.npmjs.com/package/unescape
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function unescapeHtml(html) {
    return (0, unescape_1.default)(html);
}
exports.default = unescapeHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWtDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQXdCLFlBQVksQ0FBQyxJQUFJO0lBQ3JDLE9BQU8sSUFBQSxrQkFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFGRCwrQkFFQyJ9