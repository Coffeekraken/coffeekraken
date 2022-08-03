// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        move
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          stable
 *
 * Moves a file or directory, even across devices (async)
 *
 * @param       {String}              src           The source path to move
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved once the file/directory has been moved...
 *
 * @example       js
 * import move from '@coffeekraken/node/fs/move';
 * move('my/cool/dir', 'another/place/for/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function move(src, dest) {
    return __fs.move(src, dest);
}
export default move;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSTtJQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFDRCxlQUFlLElBQUksQ0FBQyJ9