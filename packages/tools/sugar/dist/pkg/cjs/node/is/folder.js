"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
/**
 * @name            folder
 * @namespace            node.is
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed string path is a folder or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a folder, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isfolder from '@coffeekraken/sugar/node/is/folder';
 * isfolder('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function isfolder(path, settings = {}) {
    settings = (0, deepMerge_1.default)({
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
exports.default = isfolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0Qiw4RUFBd0Q7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDakMsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxPQUFPLEVBQUUsSUFBSTtLQUNoQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxVQUFVLEdBQUcsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUMsVUFBVTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzlCLElBQUksUUFBUSxDQUFDLE9BQU8sSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1FBQzNELE1BQU0sUUFBUSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3JFO1NBQU07UUFDSCxVQUFVLEdBQUcsVUFBVSxJQUFJLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDakU7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBQ0Qsa0JBQWUsUUFBUSxDQUFDIn0=