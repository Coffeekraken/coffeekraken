// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        removeSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          stable
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 *
 * @param       {String}              path           The file/directory path to delete
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import removeSync from '@coffeekraken/node/fs/removeSync';
 * try {
 *    removeSync('my/cool/file.json');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function removeSync(path) {
    return __fs.removeSync(path);
}
export default removeSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsVUFBVSxDQUFDLElBQUk7SUFDcEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9