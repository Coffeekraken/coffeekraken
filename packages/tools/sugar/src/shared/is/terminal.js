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
export default function isTerminal() {
    if (process && process.stdout && process.stdout.isTTY)
        return true;
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXJtaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVU7SUFDaEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFBRSxPQUFPLElBQUksQ0FBQztJQUNuRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMifQ==