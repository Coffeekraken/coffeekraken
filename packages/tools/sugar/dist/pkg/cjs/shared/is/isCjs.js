"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name          isCjs
 * @namespace            shared.is
 * @type          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current module system the code runs on "commonjs" module system.
 *
 * @return      {Boolean}           true if the current system is esm
 *
 * @snippet         __isCjs()
 *
 * @example       js
 * import { __isCjs } from '@coffeekraken/sugar/is';
 * __isCjs(); // => true
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isCjs() {
    return typeof module !== 'undefined';
}
exports.default = __isCjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBd0IsT0FBTztJQUMzQixPQUFPLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQztBQUN6QyxDQUFDO0FBRkQsMEJBRUMifQ==