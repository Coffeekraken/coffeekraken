// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            packageCacheDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
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
 * import packageCacheDir from '@coffeekraken/node/fs/packageCacheDir';
 * packageCacheDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IPackageCacheDirSettings {}

export default interface IPackageCacheDir {
  (settings?: IPackageCacheDirSettings): string;
}

export default function (settings: IPackageCacheDirSettings = {}) {
  settings = {
    ...settings
  };
  const packageCacheDir = __SugarConfig.get('storage.package.cacheDir');
  if (packageCacheDir !== undefined) {
    __fs.ensureDirSync(packageCacheDir);
    return packageCacheDir;
  }
  return undefined;
}
