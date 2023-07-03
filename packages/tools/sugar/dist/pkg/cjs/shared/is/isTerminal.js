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
 * @snippet         __isTerminal($1)
 *
 * @example         js
 * import { __isTerminal } from '@coffeekraken/sugar/is';
 * __isTerminal(); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isTerminal() {
    if (process && process.stdout && process.stdout.isTTY)
        return true;
    return false;
}
exports.default = __isTerminal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBd0IsWUFBWTtJQUNoQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ25FLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFIRCwrQkFHQyJ9