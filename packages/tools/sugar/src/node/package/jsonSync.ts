// @ts-nocheck

import __fs from 'fs';
import __standardizeJson from '../../shared/npm/utils/standardizeJson';
import __objectHash from '../../shared/object/objectHash';
import __readJsonSync from '../fs/readJsonSync';
import __packageJson from '../npm/packageJson';
import __packageRoot from './rootPath';

/**
 * @name          jsonSync
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [fromOrName=process.cwd()]      The path from where to search upward for the package.json file
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

let __packageJsonCache = {};
function jsonSync(
    fromOrName = process.cwd(),
    settings?: Partial<IPackageJsonSyncSettings>,
): any {
    const finalSettings = {
        highest: false,
        standardize: false,
        ...(settings ?? {}),
    };

    // "cache"
    const hash = __objectHash({
        fromOrName,
        ...(settings ?? {}),
    });
    if (__packageJsonCache[hash]) {
        return __packageJsonCache[hash];
    }

    let json;

    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${__packageRoot(
            fromOrName,
            {
                highest: finalSettings,
            }.highest,
        )}/package.json`;
        if (!__fs.existsSync(path)) return false;

        json = __readJsonSync(path);
        if (finalSettings.standardize) {
            json = __standardizeJson(json);
        }
    } else {
        json = __packageJson(fromOrName);
    }

    // cache
    if (!__packageJsonCache[hash]) __packageJsonCache[hash] = json;

    // return the json
    return json;
}
export default jsonSync;
