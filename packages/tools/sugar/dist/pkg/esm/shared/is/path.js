// @ts-nocheck
import __isValidPath from 'is-valid-path';
/**
 * @name                            path
 * @namespace           node.is
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
 * import isPath from '@coffeekraken/sugar/shared/is/path';
 * isPath('hello/world'); // => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function path(path) {
    // check if the path is valid or not
    if (!__isValidPath(path))
        return false;
    // otherwise, all is ok
    return true;
}
export default path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFMUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSTtJQUNkLG9DQUFvQztJQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3ZDLHVCQUF1QjtJQUN2QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==