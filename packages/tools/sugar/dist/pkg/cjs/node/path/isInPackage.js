"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
const packageRootDir_1 = __importDefault(require("./packageRootDir"));
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
    const packageRootDir = (0, packageRootDir_1.default)(from);
    if (!packageRootDir)
        return false;
    if (!fs_2.default.existsSync(`${packageRootDir}/package.json`))
        return false;
    const pkg = (0, fs_1.__readJsonSync)(`${packageRootDir}/package.json`);
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
exports.default = isInPackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF3RDtBQUN4RCw0Q0FBc0I7QUFDdEIsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxLQUFLO0lBQzVELE1BQU0sY0FBYyxHQUFHLElBQUEsd0JBQWdCLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsSUFBSSxDQUFDLGNBQWM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVsQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGNBQWMsZUFBZSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDckUsTUFBTSxHQUFHLEdBQUcsSUFBQSxtQkFBYyxFQUFDLEdBQUcsY0FBYyxlQUFlLENBQUMsQ0FBQztJQUU3RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjO1NBQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2IsMkJBQTJCO1NBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLHVEQUF1RDtJQUN2RCxJQUFJLE9BQU8sRUFBRTtRQUNULE9BQU8sV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDOUM7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=