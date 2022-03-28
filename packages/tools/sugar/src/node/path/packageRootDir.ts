// @ts-nocheck

import type { IPackageRootSettings } from './packageRoot';
import __packageRoot from './packageRoot';

/**
 * @name                            packageRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package root directory path
 *
 * @param       {IPackageRootDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your packageRootDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import packageRootDir from '@coffeekraken/node/fs/packageRootDir';
 * packageRootDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
global.packageRootDirs = {};
export default function (
    from: string = process.cwd(),
    settings: Partial<IPackageRootSettings> = {},
): string {
    const storageKey = `${from}-${settings.highest ? 'highest' : ''}`;

    if (!from && global.packageRootDirs[storageKey])
        return global.packageRootDirs[storageKey];

    const path = __packageRoot(from, settings);
    global.packageRootDirs[storageKey] = path;

    return path;
}
