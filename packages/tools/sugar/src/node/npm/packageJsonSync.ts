import __fs from 'fs';
import type { IPackagePathSettings } from './packagePath.js';
import __packagePathSync from './packagePathSync.js';

/**
 * @name                packageJsonSync
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * package.json JSON content
 *
 * @param       {String}        name        the package name wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @snippet         __packageJsonSync()
 *
 * @example         js
 * import { __packageJsonSync } from '@coffeekraken/sugar/npm`;
 * __packageJsonSync('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function packageJsonSync(
    name: string,
    settings?: Partial<IPackagePathSettings>,
): any {
    const path = __packagePathSync(name, settings);
    if (path) {
        const json = JSON.parse(
            __fs.readFileSync(`${path}/package.json`, 'utf8').toString(),
        );
        return json;
    }
}
