"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const extension_1 = __importDefault(require("../fs/extension"));
/**
 * @name            checkPathWithMultipleExtensions
 * @namespace            node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take a path and some extensions to check if a file
 * exists with one of these particular extensions.
 * If a file exists, the function return the path with the first extensions that matches
 *
 * @todo        tests
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {Array<String>}     extensions      The extensions (without the dot) you want to check
 * @return      {String|undefined}                  The first valid path founded, or undefined
 *
 * @snippet         __checkPathWithMultipleExtensions($1, $2)
 * __checkPathWithMultipleExtensions($1, [
 *     $2
 * ])
 *
 * @example         js
 * import { __checkPathWithMultipleExtensions } from '@coffeekraken/sugar/fs';
 * __checkPathWithMultipleExtensions('/my/cool/file.txt', ['txt','js','css']);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __checkPathWithMultipleExtensions(path, exts) {
    const extension = (0, extension_1.default)(path) || '';
    const pathWithoutExt = path.replace(`.${extension}`, '');
    for (let i = 0; i < exts.length; i++) {
        const ext = exts[i];
        if (fs_1.default.existsSync(`${pathWithoutExt}.${ext}`)) {
            return `${pathWithoutExt}.${ext}`;
        }
    }
    return undefined;
}
exports.default = __checkPathWithMultipleExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLGdFQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQXdCLGlDQUFpQyxDQUNyRCxJQUFZLEVBQ1osSUFBYztJQUVkLE1BQU0sU0FBUyxHQUFHLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxjQUFjLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRTtZQUM3QyxPQUFPLEdBQUcsY0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ3JDO0tBQ0o7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBYkQsb0RBYUMifQ==