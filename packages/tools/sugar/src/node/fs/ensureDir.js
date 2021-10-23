// @ts-nocheck
import __fs from 'fs-extra';
/**
 * @name        ensureDir
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (async)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * import ensureDir from '@coffeekraken/node/fs/ensureDir';
 * ensureDir('my/cool/dir').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureDir(dir) {
    return __fs.ensureDir(dir);
}
export default ensureDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBRztJQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=