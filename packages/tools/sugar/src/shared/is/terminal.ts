/**
 * @name            isTerminal
 * @namespace            js.is
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
 * import isTerminal from '@coffeekraken/sugar/js/is/terminal';
 * isTerminal(); // => true
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function isTerminal() {
    if (process && process.stdout && process.stdout.isTTY) return true;
    return false;
}
