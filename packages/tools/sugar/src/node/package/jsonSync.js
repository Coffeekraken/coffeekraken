// @ts-nocheck
import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';
/**
 * @name          jsonSync
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [from=process.cwd()]      The path from where to search upward for the package.json file
 * @return    {Object}          The package.json into object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import json from '@coffeekraken/sugar/node/package/json';
 * json();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
let __packageJson = {};
function jsonSync(from = process.cwd(), highest = false) {
    var _a;
    const prop = highest ? 'highest' : 'default';
    if ((_a = __packageJson[from]) === null || _a === void 0 ? void 0 : _a[prop]) {
        return __packageJson[from][prop];
    }
    const path = `${__packageRoot(from, highest)}/package.json`;
    if (!__fs.existsSync(path))
        return false;
    const json = __readJsonSync(path);
    if (!__packageJson[from])
        __packageJson[from] = {};
    __packageJson[from][prop] = json;
    return json;
}
export default jsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc29uU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sWUFBWSxDQUFDO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN2QixTQUFTLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxLQUFLOztJQUNuRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRTdDLElBQUksTUFBQSxhQUFhLENBQUMsSUFBSSxDQUFDLDBDQUFHLElBQUksQ0FBQyxFQUFFO1FBQzdCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDO0lBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7SUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFekMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBRWpDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9