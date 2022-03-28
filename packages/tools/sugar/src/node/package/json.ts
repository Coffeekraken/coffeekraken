// @ts-nocheck

import __packageRoot from './rootPath';
import __fs from 'fs';
import __readJson from '../fs/readJson';
import __standardizeJson from '../../shared/npm/utils/standardizeJson';

/**
 * @name          json
 * @namespace            node.package
 * @async
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function return you the package.json of the current working package into object format
 *
 * @param     {String}      [from=process.cwd()]      The path from where to search upward for the package.json file
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

const __packageJson = {};
function json(
    from = process.cwd(),
    settings?: Partial<IPackageJsonSyncSettings>,
) {
    return new Promise(async (resolve) => {
        const finalSettings = {
            highest: false,
            standardize: false,
            ...(settings ?? {}),
        };

        const hash = __objectHash({
            from,
            ...finalSettings,
        });

        if (__packageJson[hash]) {
            return resolve(__packageJson[hash]);
        }

        const path = `${__packageRoot(from, {
            highest: finalSettings.highest,
        })}/package.json`;
        if (!__fs.existsSync(path)) return false;

        let json = __readJsonSync(path);
        if (finalSettings.standardize) {
            json = __standardizeJson(json);
        }

        // cache
        if (!__packageJson[hash]) __packageJson[hash] = json;

        resolve(json);
    });
}
export default json;
