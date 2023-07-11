// @ts-nocheck

import __packageJsonSync from './packageJsonSync.js';

/**
 * @name          packageJson
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 * @async
 *
 * This function return you the package.json of the package you asked for, or search upward for a package.json
 *
 * @param     {String}      [fromOrName=process.cwd()]      The path from where to search upward for the package.json file, or directly a package name
 * @return    {Object}          The package.json into object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __packageJson()
 * await __packageJson()
 *
 * @example     js
 * import { __packageJson } from '@coffeekraken/sugar/package;
 * __packageJson();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface IPackageJsonSyncSettings {
    highest: boolean;
    standardize: boolean;
}

export default function __packageJson(
    fromOrName = process.cwd(),
    settings?: Partial<IPackageJsonSyncSettings>,
) {
    return new Promise(async (resolve) => {
        const json = __packageJsonSync(fromOrName, settings);
        resolve(json);
    });
}
