// @ts-nocheck
import __isPath from '../fs/isPath';
/**
 * @name                            path
 * @namespace            node.is
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/is/path';
 * isPath('hello/world'); // => true
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function path(path, checkExistence = false) {
    return __isPath(path, checkExistence);
}
export default path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxjQUFjLENBQUM7QUFFcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRyxLQUFLO0lBQ3RDLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==