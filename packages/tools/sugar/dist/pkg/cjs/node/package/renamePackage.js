"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
const path_1 = require("@coffeekraken/sugar/path");
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
 * @param       {String}        [packagePath=__packageRootDir()]  The path to the package
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __renamePackage } from '@coffeekraken/sugar/package';
 * __renamePackage('my-new-package');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function __renamePackage(newName, packagePath = (0, path_1.__packageRootDir)()) {
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
exports.default = __renamePackage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF5RTtBQUN6RSw0Q0FBc0I7QUFDdEIsbURBQTREO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLGVBQWUsQ0FDbkMsT0FBZSxFQUNmLGNBQXNCLElBQUEsdUJBQWdCLEdBQUU7SUFFeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBRTtRQUN4QyxNQUFNLElBQUksS0FBSyxDQUNYLDRCQUE0QixPQUFPLDRHQUE0RyxDQUNsSixDQUFDO0tBQ0w7SUFDRCxNQUFNLGVBQWUsR0FBRyxHQUFHLFdBQVcsZUFBZSxDQUFDO0lBQ3RELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsZ0RBQWdELGVBQWUsRUFBRSxDQUNwRSxDQUFDO0tBQ0w7SUFDRCxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFjLEVBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDcEIsSUFBQSxvQkFBZSxFQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBbEJELGtDQWtCQyJ9