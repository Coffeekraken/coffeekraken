"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/fs");
const fs_2 = __importDefault(require("fs"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
/**
 * @name          renamePackage
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to rename a package by doing:
 * - Rename the package.json "name" property
 *
 * @param      {String}           newName               The new name for your package
 * @param       {String}        [packagePath=__packageRoot()]  The path to the package
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import __renamePackage from '@coffeekraken/sugar/node/package/renamePackage';
 * __renamePackage('my-new-package');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function renamePackage(newName, packagePath = (0, packageRoot_1.default)()) {
    if (!newName.match(/^[a-zA-Z0-9\/\@_-]+$/)) {
        throw new Error(`The passed name "<yellow>${newName}</yellow>" is not a valid package name. It has to follow this pattern: <cyan>/^[a-zA-Z0-9\/\@_-]+$/</cyan>`);
    }
    const packageJsonPath = `${packagePath}/package.json`;
    if (!fs_2.default.existsSync(packageJsonPath)) {
        throw new Error(`The package.json file doesn't exist at path: ${packageJsonPath}`);
    }
    const json = (0, fs_1.__readJsonSync)(packageJsonPath);
    json.name = newName;
    (0, fs_1.__writeJsonSync)(packageJsonPath, json);
}
exports.default = renamePackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHlDQUFtRTtBQUNuRSw0Q0FBc0I7QUFDdEIsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLGFBQWEsQ0FDakMsT0FBZSxFQUNmLGNBQXNCLElBQUEscUJBQWEsR0FBRTtJQUVyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ1gsNEJBQTRCLE9BQU8sNEdBQTRHLENBQ2xKLENBQUM7S0FDTDtJQUNELE1BQU0sZUFBZSxHQUFHLEdBQUcsV0FBVyxlQUFlLENBQUM7SUFDdEQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDWCxnREFBZ0QsZUFBZSxFQUFFLENBQ3BFLENBQUM7S0FDTDtJQUNELE1BQU0sSUFBSSxHQUFHLElBQUEsbUJBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztJQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUNwQixJQUFBLG9CQUFlLEVBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFsQkQsZ0NBa0JDIn0=