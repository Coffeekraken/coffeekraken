"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPath_1 = __importDefault(require("./isPath"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
/**
 * @name                folderPath
 * @namespace           sugar.node.fs
 * @type                Function
 * @stable
 *
 * This function returns you the folder path of the file path passed.
 * You can tell the function to check for file existence before getting
 * the folder path with the second parameter.
 * Support the ```replacePathTokens``` tokens
 *
 * @param           {String}            path            The file path to get folder path from
 * @param           {Boolean}        [checkExistence=false]        Specify if you want to check the file existence before
 * @return          {String|Boolean}                    The folder path or false if not exists
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import folderPath from '@coffeekraken/sugar/node/fs/folderPath';
 * folderPath('my/cool/path.js'); // => true
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function folderPath(path, checkExistence = false) {
    path = replacePathTokens_1.default(path);
    if (checkExistence) {
        if (!isPath_1.default(path, true))
            return false;
    }
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}
exports.default = folderPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL2ZzL2ZvbGRlclBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0RBQWdDO0FBQ2hDLGtGQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxjQUFjLEdBQUcsS0FBSztJQUM5QyxJQUFJLEdBQUcsMkJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsSUFBSSxjQUFjLEVBQUU7UUFDbEIsSUFBSSxDQUFDLGdCQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO0tBQ3pDO0lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFDRCxrQkFBZSxVQUFVLENBQUMifQ==