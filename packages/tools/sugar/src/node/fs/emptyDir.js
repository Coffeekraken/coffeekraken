// @ts-nocheck
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        emptyDir
 * @namespace            node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Empty a directory (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
    dir = __replacePathTokens(dir);
    return __fs.emptyDir(dir);
}
export default emptyDir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlEaXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbXB0eURpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxJQUFJLE1BQU0sVUFBVSxDQUFDO0FBQzVCLE9BQU8sbUJBQW1CLE1BQU0sMkJBQTJCLENBQUM7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsR0FBRztJQUNuQixHQUFHLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9