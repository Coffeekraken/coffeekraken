// @ts-nocheck
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        emptyDirSync
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Empty a directory (sync)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import emptyDirSync from '@coffeekraken/node/fs/emptyDirSync';
 * try {
 *    emptyDirSync('my/cool/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyDirSync(dir) {
    dir = __replacePathTokens(dir);
    __fs.emptyDirSync(dir);
}
export default emptyDirSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlEaXJTeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW1wdHlEaXJTeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFDNUIsT0FBTyxtQkFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxZQUFZLENBQUMsR0FBRztJQUN2QixHQUFHLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0QsZUFBZSxZQUFZLENBQUMifQ==