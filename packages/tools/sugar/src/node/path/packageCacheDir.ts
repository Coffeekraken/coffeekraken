// @ts-nocheck

import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                            packageCacheDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the package cache directory path
 *
 * @param       {IPackageCacheDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import { __packageCacheDir } from '@coffeekraken/sugar/path';
 * __packageCacheDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPackageCacheDirSettings {}

export default interface IPackageCacheDir {
    (settings?: IPackageCacheDirSettings): string;
}

export default function __packageCacheDir(
    settings: IPackageCacheDirSettings = {},
) {
    settings = {
        ...settings,
    };
    return __SSugarConfig.get('storage.package.cacheDir');
}
