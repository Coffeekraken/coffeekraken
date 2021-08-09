// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJson from '../fs/readJson';
/**
 * @name          json
 * @namespace            node.package
 * @async
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
const __packageJson = {};
function json(from = process.cwd(), highest = false) {
    var _a;
    const prop = highest ? 'highest' : 'default';
    if ((_a = __packageJson[from]) === null || _a === void 0 ? void 0 : _a[prop]) {
        return __packageJson[from][prop];
    }
    const path = `${__packageRoot(from, highest)}/package.json`;
    if (!__fs.existsSync(path))
        return false;
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const json = yield __readJson(path);
        if (!__packageJson[from])
            __packageJson[from] = {};
        __packageJson[from][prop] = json;
        resolve(json);
    }));
}
export default json;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sYUFBYSxNQUFNLFlBQVksQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxVQUFVLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN6QixTQUFTLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxLQUFLOztJQUVqRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRTdDLElBQUksTUFBQSxhQUFhLENBQUMsSUFBSSxDQUFDLDBDQUFHLElBQUksQ0FBQyxFQUFFO1FBQy9CLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7SUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBRW5DLE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuRCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRWpDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsSUFBSSxDQUFDIn0=