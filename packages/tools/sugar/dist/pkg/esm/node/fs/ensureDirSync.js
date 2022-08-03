// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        ensureDirSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * import ensureDirSync from '@coffeekraken/node/fs/ensureDirSync';
 * try {
 *    ensureDirSync('my/cool/dir');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ensureDirSync(dir) {
    __fs.ensureDirSync(dir);
}
export default ensureDirSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsYUFBYSxDQUFDLEdBQUc7SUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==