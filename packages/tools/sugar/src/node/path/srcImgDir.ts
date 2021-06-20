// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            srcImgDir
 * @namespace            node.path
 * @type                            Function
 * @stable
 *
 * Return the package dist directory path
 *
 * @param       {ISrcImgDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcImgDir from '@coffeekraken/node/fs/srcImgDir';
 * srcImgDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISrcImgDirSettings {}

export default interface ISrcImgDir {
  (settings?: ISrcImgDirSettings): string;
}

export default function (settings: ISrcImgDirSettings = {}) {
  settings = {
    ...settings
  };
  const srcImgDir = __SugarConfig.get('storage.src.jsDir');
  if (srcImgDir !== undefined) {
    __fs.ensureDirSync(srcImgDir);
    return srcImgDir;
  }
  return undefined;
}
