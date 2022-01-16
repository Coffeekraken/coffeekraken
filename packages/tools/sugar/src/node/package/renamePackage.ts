// @ts-nocheck

import __readJsonSync from '../fs/readJsonSync';
import __writeJsonSync from '../fs/writeJsonSync';
import __fs from 'fs';
import __packageRoot from '../path/packageRoot';

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
 * @param      {String}           newName               The new name for your package
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
export default function renamePackage(newName: string, packagePath: string = __packageRoot()): void {
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
