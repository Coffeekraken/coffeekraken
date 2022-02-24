// @ts-nocheck
import __isPath from './isPath';
/**
 * @name                folderPath
 * @namespace            node.fs
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function returns you the folder path of the file path passed.
 * You can tell the function to check for file existence before getting
 * the folder path with the second parameter.
 *
 * @param           {String}            path            The file path to get folder path from
 * @param           {Boolean}        [checkExistence=false]        Specify if you want to check the file existence before
 * @return          {String|Boolean}                    The folder path or false if not exists
 *
 * @example         js
 * import folderPath from '@coffeekraken/sugar/node/fs/folderPath';
 * folderPath('my/cool/path.js'); // => true
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function folderPath(path, checkExistence = false) {
    if (checkExistence) {
        if (!__isPath(path, true))
            return false;
    }
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}
export default folderPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGRlclBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLGNBQWMsR0FBRyxLQUFLO0lBQzVDLElBQUksY0FBYyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQzNDO0lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ25CLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9