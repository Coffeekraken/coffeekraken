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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function emptyDir(dir) {
    return __fs.emptyDir(dir);
}
export default emptyDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxHQUFHO0lBQ2pCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSxRQUFRLENBQUMifQ==