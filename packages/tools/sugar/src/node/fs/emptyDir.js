// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        emptyDir
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          beta
 *
 * Empty a directory (async)
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @example       js
 * import emptyDir from '@coffeekraken/node/fs/emptyDir';
 * emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyDir(dir) {
    return __fs.emptyDir(dir);
}
export default emptyDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbXB0eURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxRQUFRLENBQUMsR0FBRztJQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=