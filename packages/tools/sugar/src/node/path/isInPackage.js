// @ts-nocheck
import __packageRoot from './packageRoot';
import __fs from 'fs';
/**
 * @name                    isInPackage
 * @namespace            node.path
 * @type                    Function
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInPackage(name, from = process.cwd(), highest = false) {
    const packageRoot = __packageRoot(from);
    if (!packageRoot)
        return false;
    if (!__fs.existsSync(`${packageRoot}/package.json`))
        return false;
    const pkg = require(`${packageRoot}/package.json`);
    let names = name;
    if (typeof names === 'string')
        names = names.split(',').map((f) => f.trim());
    for (let i = 0; i < names.length; i++) {
        if (names[i] === pkg.name) {
            return true;
        }
    }
    let newPath = packageRoot
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNJblBhY2thZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpc0luUGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDOUQsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQyxXQUFXO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQ2xFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLFdBQVcsZUFBZSxDQUFDLENBQUM7SUFFbkQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0UsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxJQUFJLE9BQU8sR0FBRyxXQUFXO1NBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2IsMkJBQTJCO1NBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUViLHVEQUF1RDtJQUN2RCxJQUFJLE9BQU8sRUFBRTtRQUNYLE9BQU8sV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9