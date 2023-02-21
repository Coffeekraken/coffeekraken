// @ts-nocheck
import __isValidPath from 'is-valid-path';
/**
 * @name                            isPath
 * @namespace           shared.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __isPath } from '@coffeekraken/sugar/is';
 * __isPath('hello/world'); // => true
 *
 @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isPath(path) {
    // check if the path is valid or not
    if (!__isValidPath(path))
        return false;
    // otherwise, all is ok
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQUMsSUFBSTtJQUNqQyxvQ0FBb0M7SUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN2Qyx1QkFBdUI7SUFDdkIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9