"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const find_package_json_1 = __importDefault(require("find-package-json"));
/**
 * @name                    packageRoot
 * @namespace           sugar.node.path
 * @type                    Function
 *
 * Return the path to either the first finded package root going up the folders, or the highest package root finded
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
module.exports = packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLDBFQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxLQUFLO0lBQ3hELE1BQU0sQ0FBQyxHQUFHLDJCQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXBCLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQy9CLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsSUFBSSxTQUFTLENBQUM7SUFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsTUFBTTtRQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDakI7SUFDRCxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7UUFDdEIsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQ0QsaUJBQVMsV0FBVyxDQUFDIn0=