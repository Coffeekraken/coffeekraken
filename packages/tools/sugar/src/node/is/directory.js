"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name            directory
 * @namespace           sugar.node.is
 * @type            Function
 * @stable
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
 * @example     js
 * import isDirectory from '@coffeekraken/sugar/node/is/directory';
 * isDirectory('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isDirectory(path, settings = {}) {
    settings = deepMerge_1.default({
        symlink: true
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
module.exports = isDirectory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlyZWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsNENBQXNCO0FBQ3RCLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLE9BQU8sRUFBRSxJQUFJO0tBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksVUFBVSxHQUFHLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsSUFBSSxDQUFDLFVBQVU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM5QixJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksWUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtRQUM3RCxNQUFNLFFBQVEsR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxVQUFVLElBQUksWUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNuRTtTQUFNO1FBQ0wsVUFBVSxHQUFHLFVBQVUsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQy9EO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUNELGlCQUFTLFdBQVcsQ0FBQyJ9