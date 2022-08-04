"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            isTerminal
 * @namespace            shared.is
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply returns if the process runs inside a terminal or not
 *
 * @return      {Boolean}           true if is in the terminal, false if not
 *
 * @example         js
 * import isTerminal from '@coffeekraken/sugar/shared/is/terminal';
 * isTerminal(); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isTerminal() {
    if (process && process.stdout && process.stdout.isTTY)
        return true;
    return false;
}
exports.default = isTerminal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQXdCLFVBQVU7SUFDOUIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNuRSxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBSEQsNkJBR0MifQ==