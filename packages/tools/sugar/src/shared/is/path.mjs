// @ts-nocheck
import __isValidPath from 'is-valid-path';
/**
 * @name                            path
 * @namespace           node.is
 * @type                            Function
 * @stable
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
 * import isPath from '@coffeekraken/sugar/js/is/path';
 * isPath('hello/world'); // => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function path(path) {
    // check if the path is valid or not
    if (!__isValidPath(path))
        return false;
    // otherwise, all is ok
    return true;
}
export default path;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvaXMvcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO0lBQ2hCLG9DQUFvQztJQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ3ZDLHVCQUF1QjtJQUN2QixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxlQUFlLElBQUksQ0FBQyJ9