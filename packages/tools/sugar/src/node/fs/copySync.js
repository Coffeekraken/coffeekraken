// @ts-nocheck
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        copySync
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Copy a file or directory (sync)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import copySync from '@coffeekraken/node/fs/copySync';
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function copySync(src, dest) {
    src = __replacePathTokens(src);
    dest = __replacePathTokens(dest);
    __fs.copySync(src, dest);
}
export default copySync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weVN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3B5U3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBQzVCLE9BQU8sbUJBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSTtJQUN6QixHQUFHLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9