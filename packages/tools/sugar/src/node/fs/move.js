// @ts-nocheck
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        move
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Moves a file or directory, even across devices (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              src           The source path to move
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved once the file/directory has been moved...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import move from '@coffeekraken/node/fs/move';
 * move('my/cool/dir', 'another/place/for/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function move(src, dest) {
    src = __replacePathTokens(src);
    dest = __replacePathTokens(dest);
    return __fs.move(src, dest);
}
export default move;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLFVBQVUsQ0FBQztBQUM1QixPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJO0lBQ3JCLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBQ0QsZUFBZSxJQUFJLENBQUMifQ==