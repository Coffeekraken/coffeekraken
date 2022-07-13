// @ts-nocheck

import __jsonSync from './jsonSync';

/**
 * @name          json
 * @namespace            node.package
 * @async
 * @type          Function
 * @platform        node
 * @status          beta
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
 * @example     js
 * import json from '@coffeekraken/sugar/node/package/json';
 * json();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface IPackageJsonSyncSettings {
    highest: boolean;
    standardize: boolean;
}

function json(
    fromOrName = process.cwd(),
    settings?: Partial<IPackageJsonSyncSettings>,
) {
    return new Promise(async (resolve) => {
        const json = __jsonSync(fromOrName, settings);
        resolve(json);
    });
}
export default json;
