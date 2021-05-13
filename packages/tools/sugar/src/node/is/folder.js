// @ts-nocheck
import __fs from 'fs';
import __deepMerge from '../../shared/object/deepMerge';
/**
 * @name            folder
 * @namespace            node.is
 * @type            Function
 * @stable
 *
 * This function check if the passed string path is a folder or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a folder, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isfolder from '@coffeekraken/sugar/node/is/folder';
 * isfolder('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isfolder(path, settings = {}) {
    settings = __deepMerge({
        symlink: true
    }, settings);
    let isMatching = __fs.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
        const realPath = __fs.realpathSync(path);
        isMatching = isMatching && __fs.lstatSync(realPath).isDirectory();
    }
    else {
        isMatching = isMatching && __fs.lstatSync(path).isDirectory();
    }
    return isMatching;
}
export default isfolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNuQyxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLE9BQU8sRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM5QixJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtRQUM3RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNuRTtTQUFNO1FBQ0wsVUFBVSxHQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQy9EO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=