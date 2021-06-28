// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            srcRootDir
 * @namespace            node.path
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Return the package dist directory path
 *
 * @param       {ISrcRootDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcRootDir from '@coffeekraken/node/fs/srcRootDir';
 * srcRootDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISrcRootDirSettings {}

export default interface ISrcRootDir {
  (settings?: ISrcRootDirSettings): string;
}

export default function (settings: ISrcRootDirSettings = {}) {
  settings = {
    ...settings
  };
  const srcRootDir = __SugarConfig.get('storage.src.rootDir');
  if (srcRootDir !== undefined) {
    __fs.ensureDirSync(srcRootDir);
    return srcRootDir;
  }
  return undefined;
}
