// @ts-nocheck
import __isValidPath from 'is-valid-path';
import __fs from 'fs';
/**
 * @name                            isPath
 * @namespace            node.fs
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
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/fs/isPath';
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isPath(path, checkExistence = false) {
    if (typeof path !== 'string')
        return false;
    // empty string
    if (path.trim() === '')
        return false;
    // multiple lines content
    if (path.split('\n').length > 1)
        return false;
    // check if we have some /
    if (!path.includes('/')) {
        if (!path.includes('.'))
            return false;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXNQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFjLEdBQUcsS0FBSztJQUN4QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUUzQyxlQUFlO0lBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXJDLHlCQUF5QjtJQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU5QywwQkFBMEI7SUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7S0FDekM7SUFFRCxvQ0FBb0M7SUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV2Qyx5Q0FBeUM7SUFDekMsSUFBSSxjQUFjLEVBQUU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7S0FDNUM7SUFFRCx1QkFBdUI7SUFDdkIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUNELGVBQWUsTUFBTSxDQUFDIn0=