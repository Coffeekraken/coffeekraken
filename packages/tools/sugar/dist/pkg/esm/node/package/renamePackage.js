// @ts-nocheck
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
export default function __renamePackage(newName, packagePath = __packageRootDir()) {
    if (!newName.match(/^[a-zA-Z0-9\/\@_-]+$/)) {
        throw new Error(`The passed name "<yellow>${newName}</yellow>" is not a valid package name. It has to follow this pattern: <cyan>/^[a-zA-Z0-9\/\@_-]+$/</cyan>`);
    }
    const packageJsonPath = `${packagePath}/package.json`;
    if (!__fs.existsSync(packageJsonPath)) {
        throw new Error(`The package.json file doesn't exist at path: ${packageJsonPath}`);
    }
    const json = __readJsonSync(packageJsonPath);
    json.name = newName;
    __writeJsonSync(packageJsonPath, json);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FDbkMsT0FBZSxFQUNmLGNBQXNCLGdCQUFnQixFQUFFO0lBRXhDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FDWCw0QkFBNEIsT0FBTyw0R0FBNEcsQ0FDbEosQ0FBQztLQUNMO0lBQ0QsTUFBTSxlQUFlLEdBQUcsR0FBRyxXQUFXLGVBQWUsQ0FBQztJQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUNYLGdEQUFnRCxlQUFlLEVBQUUsQ0FDcEUsQ0FBQztLQUNMO0lBQ0QsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ3BCLGVBQWUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyJ9