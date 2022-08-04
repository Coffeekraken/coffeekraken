// @ts-nocheck
import __fs from 'fs';
/**
 * @name                            grabFirstExisting
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check every passed paths and return the first existing one.
 *
 * @param         {String[]}            paths              The paths to check
 * @return          {String}                            The first existing path
 *
 * @example       js
 * import __grabFirstExisting from '@coffeekraken/sugar/node/fs/grabFirstExisting';
 * __grabFirstExisting([
 *  'file/1.txt',
 *  'file/2.txt
 * ]); // => 'file/2.txt'
' *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function grabFirstExisting(paths) {
    for (let [idx, path] of Object.entries(paths)) {
        if (__fs.existsSync(path))
            return path;
    }
}
export default grabFirstExisting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsaUJBQWlCLENBQUMsS0FBZTtJQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDMUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9