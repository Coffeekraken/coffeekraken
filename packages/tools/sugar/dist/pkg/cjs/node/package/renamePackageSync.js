"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("../fs/writeJsonSync"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
/**
 * @name          renamePackageSync
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to rename a package by doing:
 * - Rename the package.json "name" property
 *
 * @param      {String}           newName               The new name for your package
 * @param       {String}        [packagePath=__packageRootDir()]  The path to the package
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __renamePackageSync } from '@coffeekraken/sugar/package';
 * __renamePackageSync('my-new-package');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function __renamePackageSync(newName, packagePath = (0, packageRootDir_1.default)()) {
    if (!newName.match(/^[a-zA-Z0-9\/\@_-]+$/)) {
        throw new Error(`The passed name "<yellow>${newName}</yellow>" is not a valid package name. It has to follow this pattern: <cyan>/^[a-zA-Z0-9\/\@_-]+$/</cyan>`);
    }
    const packageJsonPath = `${packagePath}/package.json`;
    if (!fs_1.default.existsSync(packageJsonPath)) {
        throw new Error(`The package.json file doesn't exist at path: ${packageJsonPath}`);
    }
    const json = (0, readJsonSync_1.default)(packageJsonPath);
    json.name = newName;
    (0, writeJsonSync_1.default)(packageJsonPath, json);
}
exports.default = __renamePackageSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0QixzRUFBZ0Q7QUFDaEQsd0VBQWtEO0FBQ2xELDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUF3QixtQkFBbUIsQ0FDdkMsT0FBZSxFQUNmLGNBQXNCLElBQUEsd0JBQWdCLEdBQUU7SUFFeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUNYLDRCQUE0QixPQUFPLDRHQUE0RyxDQUNsSixDQUFDO0tBQ0w7SUFDRCxNQUFNLGVBQWUsR0FBRyxHQUFHLFdBQVcsZUFBZSxDQUFDO0lBQ3RELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsZ0RBQWdELGVBQWUsRUFBRSxDQUNwRSxDQUFDO0tBQ0w7SUFDRCxNQUFNLElBQUksR0FBRyxJQUFBLHNCQUFjLEVBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDcEIsSUFBQSx1QkFBZSxFQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBbEJELHNDQWtCQyJ9