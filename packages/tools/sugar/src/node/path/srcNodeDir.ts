// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            srcNodeDir
 * @namespace            node.path
 * @type                            Function
 * @stable
 *
 * Return the package dist directory path
 *
 * @param       {ISrcNodeDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcNodeDir from '@coffeekraken/node/fs/srcNodeDir';
 * srcNodeDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISrcNodeDirSettings {}

export default interface ISrcNodeDir {
  (settings?: ISrcNodeDirSettings): string;
}

export default function (settings: ISrcNodeDirSettings = {}) {
  settings = {
    ...settings
  };
  const srcNodeDir = __SugarConfig.get('storage.src.nodeDir');
  if (srcNodeDir !== undefined) {
    __fs.ensureDirSync(srcNodeDir);
    return srcNodeDir;
  }
  return undefined;
}
