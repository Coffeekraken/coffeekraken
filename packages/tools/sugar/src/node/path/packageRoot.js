// @ts-nocheck
import __isFile from '../is/file';
import __findPkgJson from 'find-package-json';
/**
 * @name                    packageRoot
 * @namespace            node.path
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @feature         Support file path as input
 * @feature         Allows you to specify if you want the highest package.json founded using the ```highest``` parameter
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * import packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
 * const root = packageRoot();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function packageRoot(from = process.cwd(), highest = false) {
    if (__isFile(from))
        from = from.split('/').slice(0, -1).join('/');
    const f = __findPkgJson(from);
    let file = f.next();
    if (!file || !file.filename)
        return false;
    if (!highest) {
        const filename = file.filename || false;
        if (!filename)
            return filename;
        return filename.split('/').slice(0, -1).join('/');
    }
    let finalFile;
    while (!file.done) {
        if (file.done)
            break;
        finalFile = file;
        file = f.next();
    }
    if (finalFile.filename) {
        return finalFile.filename.split('/').slice(0, -1).join('/');
    }
    return false;
}
export default packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sYUFBYSxNQUFNLG1CQUFtQixDQUFDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsS0FBSztJQUN0RCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxFLE1BQU0sQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFMUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDL0IsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckQ7SUFFRCxJQUFJLFNBQVMsQ0FBQztJQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSTtZQUFFLE1BQU07UUFDckIsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ25CO0lBQ0QsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO1FBQ3BCLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvRDtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9