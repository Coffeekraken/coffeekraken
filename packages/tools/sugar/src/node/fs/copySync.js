// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        copySync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Copy a file or directory (sync)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @example       js
 * import copySync from '@coffeekraken/node/fs/copySync';
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function copySync(src, dest) {
    __fs.copySync(src, dest);
}
export default copySync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weVN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3B5U3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSTtJQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==