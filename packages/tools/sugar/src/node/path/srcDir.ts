// @ts-nocheck

import __sugarConfig from '../config/sugar';
import __fs from 'fs-extra';
/**
 * @name                            srcDir
 * @namespace               sugar.node.path
 * @type                            Function
 * @stable
 *
 * Return the package dist directory path
 *
 * @param       {ISrcDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import srcDir from '@coffeekraken/node/fs/srcDir';
 * srcDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISrcDirSettings {}

export default interface ISrcDir {
  (settings?: ISrcDirSettings): string;
}

export default function (settings: ISrcDirSettings = {}) {
  settings = {
    ...settings
  };
  const srcDir = __sugarConfig('storage.srcDir');
  if (srcDir !== undefined) {
    __fs.ensureDirSync(srcDir);
    return srcDir;
  }
  return undefined;
}
