// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        ensureFileSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @example       js
 * import ensureFileSync from '@coffeekraken/node/fs/ensureFileSync';
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureFileSync(file) {
    __fs.ensureFileSync(file);
}
export default ensureFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRmlsZVN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbnN1cmVGaWxlU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsY0FBYyxDQUFDLElBQUk7SUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSxjQUFjLENBQUMifQ==