// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            cacheDir
 * @namespace               sugar.node.path
 * @type                            Function
 * @stable
 *
 * Return the package cache directory path
 *
 * @param       {ICacheDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import cacheDir from '@coffeekraken/node/fs/cacheDir';
 * cacheDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ICacheDirSettings {}

export default interface ICacheDir {
  (settings?: ICacheDirSettings): string;
}

export default function (settings: ICacheDirSettings = {}) {
  settings = {
    ...settings
  };
  const cacheDir = __sugarConfig('storage.cacheDir');
  if (cacheDir !== undefined) {
    __fs.ensureDirSync(cacheDir);
    return cacheDir;
  }
  return undefined;
}
