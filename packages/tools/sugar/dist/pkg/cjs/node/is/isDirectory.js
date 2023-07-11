"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_js_1 = __importDefault(require("../../shared/object/deepMerge.js"));
/**
 * @name            isDirectory
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a directory or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a directory, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isDirectory($1)
 *
 * @example     js
 * import { __isDirectory } from '@coffeekraken/sugar/is';
 * __isDirectory('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isDirectory(path, settings = {}) {
    settings = (0, deepMerge_js_1.default)({
        symlink: true,
    }, settings);
    let isMatching = fs_1.default.existsSync(path);
    if (!isMatching)
        return false;
    if (settings.symlink && fs_1.default.lstatSync(path).isSymbolicLink()) {
        const realPath = fs_1.default.realpathSync(path);
        isMatching = isMatching && fs_1.default.lstatSync(realPath).isDirectory();
    }
    else {
        isMatching = isMatching && fs_1.default.lstatSync(path).isDirectory();
    }
    return isMatching;
}
exports.default = __isDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixvRkFBMkQ7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQXdCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDckQsUUFBUSxHQUFHLElBQUEsc0JBQVcsRUFDbEI7UUFDSSxPQUFPLEVBQUUsSUFBSTtLQUNoQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsVUFBVTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzlCLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQzNELE1BQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3JFO1NBQU07UUFDSCxVQUFVLEdBQUcsVUFBVSxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDakU7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBakJELGdDQWlCQyJ9