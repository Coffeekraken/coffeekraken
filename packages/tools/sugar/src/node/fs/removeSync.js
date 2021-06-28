// @ts-nocheck
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        removeSync
 * @namespace            node.fs
 * @type          Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 * Support the ```replacePathTokens``` tokens
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function removeSync(path) {
    path = __replacePathTokens(path);
    return __fs.removeSync(path);
}
export default removeSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW92ZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQUM1QixPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsVUFBVSxDQUFDLElBQUk7SUFDdEIsSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==