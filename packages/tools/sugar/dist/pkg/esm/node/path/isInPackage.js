// @ts-nocheck
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __fs from 'fs';
import __packageRootDir from './packageRootDir';
/**
 * @name                    isInPackage
 * @namespace            node.path
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @param           {String|Array}              name             The package name to check or a string comma separated like "myPackage,another"
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * import isInPackage from '@coffeekraken/sugar/node/path/isInPackage';
 * const root = isInPackage();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isInPackage(name, from = process.cwd(), highest = false) {
    const packageRootDir = __packageRootDir(from);
    if (!packageRootDir)
        return false;
    if (!__fs.existsSync(`${packageRootDir}/package.json`))
        return false;
    const pkg = __readJsonSync(`${packageRootDir}/package.json`);
    let names = name;
    if (typeof names === 'string')
        names = names.split(',').map((f) => f.trim());
    for (let i = 0; i < names.length; i++) {
        if (names[i] === pkg.name) {
            return true;
        }
    }
    const newPath = packageRootDir
        .split('/')
        .slice(0, -1)
        // .filter((i) => i !== '')
        .join('/');
    // no package found... check if we need to check higher
    if (highest) {
        return isInPackage(name, newPath, highest);
    }
    return false;
}
export default isInPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsS0FBSztJQUM1RCxNQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxJQUFJLENBQUMsY0FBYztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRWxDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYyxlQUFlLENBQUM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUNyRSxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxjQUFjLGVBQWUsQ0FBQyxDQUFDO0lBRTdELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFDekIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7S0FDSjtJQUVELE1BQU0sT0FBTyxHQUFHLGNBQWM7U0FDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDYiwyQkFBMkI7U0FDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsdURBQXVEO0lBQ3ZELElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9