// @ts-nocheck

import { __readJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
import __objectHash from '../../shared/object/objectHash';
import __packageJson from '../npm/packageJson';
import __packageRootDir from '../path/packageRootDir';

/**
 * @name          composerJsonSync
 * @namespace            node.package
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * This function return you the composer.json of the current working package into object format
 *
 * @param     {String}      [fromOrName=process.cwd()]      The path from where to search upward for the package.json file
 * @return    {Object}          The package.json into object format
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import { __composerJsonSync } from '@coffeekraken/sugar/package';
 * __composerJsonSync();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface IComposerJsonSyncSettings {
    highest: boolean;
}

let _composerJsonCache = {};
export default function __composerJsonSync(
    fromOrName = process.cwd(),
    settings?: Partial<IComposerJsonSyncSettings>,
): any {
    const finalSettings = {
        highest: false,
        ...(settings ?? {}),
    };

    // "cache"
    const hash = __objectHash({
        fromOrName,
        ...(settings ?? {}),
    });
    if (_composerJsonCache[hash]) {
        return _composerJsonCache[hash];
    }

    let json;

    // if the "fromOrName" starts with a "/"
    // means that it's not a package name
    if (fromOrName.match(/^\//)) {
        const path = `${__packageRootDir(fromOrName, {
            highest: finalSettings.highest,
        })}/composer.json`;

        if (!__fs.existsSync(path)) return false;

        json = __readJsonSync(path);
    } else {
        json = __packageJson(fromOrName);
    }

    // cache
    if (!_composerJsonCache[hash]) _composerJsonCache[hash] = json;

    // return the json
    return json;
}
