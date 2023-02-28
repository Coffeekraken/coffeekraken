import __fs from 'fs';
import type { IComposerPathSettings } from './composerPath';
import __composerPath from './composerPath';

/**
 * @name                composerJsonSync
 * @namespace            node.npm
 * @type                Function
 * @platform        node
 * @status          beta
 *
 * This function simply take a package name as parameter, and return the corresponding
 * composer.json JSON content
 *
 * @param       {String}        [nameOrPath=process.cwd()]        the package name or path wanted
 * @param       {IPackageJson}      [settings={}]       Some settings to configure your process
 * @return      {JSON}                      The package.json content
 *
 * @snippet         __composerJson($1)
 *
 * @example         js
 * import { __composerJson } from '@coffeekraken/sugar/composer`;
 * __composerJson('lodash');
 *
 * @todo        Implement a cache strategy to avoid making same process again and again
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function composerJsonSync(
    nameOrPath: string,
    settings?: Partial<IComposerPathSettings>,
): any {

    
    if (nameOrPath.match(/^\//)) {
        if (!__fs.existsSync(`${nameOrPath}/composer.json`)) {
            return;
        }
        return JSON.parse(
            __fs.readFileSync(`${nameOrPath}/composer.json`).toString(),
        );
    }

    // get package path from name
    const path = __composerPath(nameOrPath, settings);
    if (path) {
        const json = JSON.parse(
            __fs.readFileSync(`${path}/composer.json`, 'utf8').toString(),
        );
        return json;
    }

    return {};
}
