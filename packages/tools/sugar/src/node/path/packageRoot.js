"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = packageRoot;
