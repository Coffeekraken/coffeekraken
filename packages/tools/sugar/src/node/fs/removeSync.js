// @ts-nocheck
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        removeSync
 * @namespace            node.fs
 * @type          Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW92ZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQUM1QixPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFJO0lBQ3RCLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=