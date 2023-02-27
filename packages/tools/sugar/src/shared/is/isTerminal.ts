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
export default function __isTerminal() {
    if (process && process.stdout && process.stdout.isTTY) return true;
    return false;
}
