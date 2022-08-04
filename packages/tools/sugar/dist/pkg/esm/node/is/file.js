// @ts-nocheck
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
/**
 * @name            file
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a file or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a file, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isFile from '@coffeekraken/sugar/node/is/file';
 * isFile('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isFile(path, settings = {}) {
    settings = __deepMerge({
        symlink: true,
    }, settings);
    let isMatching = __fs.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
        const realPath = __fs.realpathSync(path);
        isMatching = isMatching && __fs.lstatSync(realPath).isFile();
    }
    else {
        isMatching = isMatching && __fs.lstatSync(path).isFile();
    }
    return isMatching;
}
export default isFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDL0IsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxPQUFPLEVBQUUsSUFBSTtLQUNoQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsVUFBVTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzlCLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQzNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsVUFBVSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hFO1NBQU07UUFDSCxVQUFVLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDNUQ7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBQ0QsZUFBZSxNQUFNLENBQUMifQ==