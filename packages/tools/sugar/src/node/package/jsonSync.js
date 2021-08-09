// @ts-nocheck
import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJsonSync from '../fs/readJsonSync';
/**
 * @name          jsonSync
 * @namespace            node.package
 * @type          Function
 * @platform        ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvblN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqc29uU3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0sWUFBWSxDQUFDO0FBQ3ZDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDdkIsU0FBUyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEdBQUcsS0FBSzs7SUFFckQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUU3QyxJQUFJLE1BQUEsYUFBYSxDQUFDLElBQUksQ0FBQywwQ0FBRyxJQUFJLENBQUMsRUFBRTtRQUMvQixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQztJQUVELE1BQU0sSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDO0lBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXpDLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbkQsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUVqQyxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxlQUFlLFFBQVEsQ0FBQyJ9