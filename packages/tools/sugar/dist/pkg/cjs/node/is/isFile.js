"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
/**
 * @name            isFile
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a file or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a file, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isFile($1);
 *
 * @example     js
 * import { __isFile } from '@coffeekraken/sugar/is';
 * __isFile('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isFile(path, settings = {}) {
    settings = (0, deepMerge_1.default)({
        symlink: true,
    }, settings);
    let isMatching = fs_1.default.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && fs_1.default.lstatSync(path).isSymbolicLink()) {
        const realPath = fs_1.default.realpathSync(path);
        isMatching = isMatching && fs_1.default.lstatSync(realPath).isFile();
    }
    else {
        isMatching = isMatching && fs_1.default.lstatSync(path).isFile();
    }
    return isMatching;
}
exports.default = __isFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDaEQsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxPQUFPLEVBQUUsSUFBSTtLQUNoQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsVUFBVTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzlCLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQzNELE1BQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2hFO1NBQU07UUFDSCxVQUFVLEdBQUcsVUFBVSxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDNUQ7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBakJELDJCQWlCQyJ9