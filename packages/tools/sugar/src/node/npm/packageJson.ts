import __fs from 'fs';
import type { IPackagePathSettings } from './packagePath';
import __packagePath from './packagePath';

/**
 * @name                packageJson
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
 * @example         js
 * import packageJson from '@coffeekraken/sugar/node/npm/packageJson`;
 * packagrJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function packageJson(
    name: string,
    settings?: Partial<IPackagePathSettings>,
): any {
    const path = __packagePath(name, settings);
    if (path) {
        const json = JSON.parse(
            __fs.readFileSync(`${path}/package.json`, 'utf8').toString(),
        );
        return json;
    }
}
