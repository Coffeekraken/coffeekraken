"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const file_1 = __importDefault(require("../is/file"));
const find_package_json_1 = __importDefault(require("find-package-json"));
/**
 * @name                    packageRoot
 * @namespace           sugar.node.path
 * @type                    Function
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
 *
 * @feature         Support file path as input
 * @feature         Allows you to specify if you want the highest package.json founded using the ```highest``` parameter
 *
 * @param           {String}              [from=process.cwd()]    Specify from where the research has to be done
 * @param           {Boolean}             [highest=false]         Specify if you want the highest package root or the first finded
 * @return          {String}                                      The finded package path or false if not finded
 *
 * @example         js
 * import packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
 * const root = packageRoot();
 *
 * @see       https://www.npmjs.com/package/find-package-json
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function packageRoot(from = process.cwd(), highest = false) {
    if (file_1.default(from))
        from = folderPath_1.default(from);
    const f = find_package_json_1.default(from);
    let file = f.next();
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
exports.default = packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9wYXRoL3BhY2thZ2VSb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUE0QztBQUU1QyxzREFBa0M7QUFDbEMsMEVBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDeEQsSUFBSSxjQUFRLENBQUMsSUFBSSxDQUFDO1FBQUUsSUFBSSxHQUFHLG9CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUMsTUFBTSxDQUFDLEdBQUcsMkJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDL0IsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkQ7SUFFRCxJQUFJLFNBQVMsQ0FBQztJQUNkLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2pCLElBQUksSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNO1FBQ3JCLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNqQjtJQUNELElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtRQUN0QixPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0Q7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFDRCxrQkFBZSxXQUFXLENBQUMifQ==