"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            isTerminal
 * @namespace            js.is
 * @type            Function
 *
 * This function simply returns if the process runs inside a terminal or not
 *
 * @return      {Boolean}           true if is in the terminal, false if not
 *
 * @example         js
 * import isTerminal from '@coffeekraken/sugar/js/is/terminal';
 * isTerminal(); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isTerminal() {
    if (process && process.stdout && process.stdout.isTTY)
        return true;
    return false;
}
exports.default = isTerminal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2lzL3Rlcm1pbmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsU0FBd0IsVUFBVTtJQUNoQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ25FLE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUhELDZCQUdDIn0=