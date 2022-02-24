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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMvQixRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE9BQU8sRUFBRSxJQUFJO0tBQ2hCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxVQUFVO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDOUIsSUFBSSxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7UUFDM0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxVQUFVLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDaEU7U0FBTTtRQUNILFVBQVUsR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUM1RDtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9