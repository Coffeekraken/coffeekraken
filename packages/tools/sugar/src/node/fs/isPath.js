// @ts-nocheck
import __isValidPath from 'is-valid-path';
import __fs from 'fs';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name                            isPath
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Check if the passed string is a valid path or not
 * Support the ```replacePathTokens``` tokens
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/fs/isPath';
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPath(path, checkExistence = false) {
    path = __replacePathTokens(path);
    // check if we have some /
    if (!path.includes('/'))
        return false;
    // check if the path is valid or not
    if (!__isValidPath(path))
        return false;
    // if we have to check the path existence
    if (checkExistence) {
        if (!__fs.existsSync(path))
            return false;
    }
    // otherwise, all is ok
    return true;
}
export default isPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sbUJBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFjLEdBQUcsS0FBSztJQUMxQyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFakMsMEJBQTBCO0lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXRDLG9DQUFvQztJQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXZDLHlDQUF5QztJQUN6QyxJQUFJLGNBQWMsRUFBRTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUMxQztJQUVELHVCQUF1QjtJQUN2QixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9