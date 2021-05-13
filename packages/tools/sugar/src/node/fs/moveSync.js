// @ts-nocheck
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        moveSync
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Moves a file or directory, even across devices (sync)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import moveSync from '@coffeekraken/node/fs/moveSync';
 * try {
 *    moveSync('my/cool/dir', 'another/place/for/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function moveSync(src, dest) {
    src = __replacePathTokens(src);
    dest = __replacePathTokens(dest);
    _fs.moveSync(src, dest);
}
export default moveSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZVN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb3ZlU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBR2QsT0FBTyxtQkFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJO0lBQ3pCLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=