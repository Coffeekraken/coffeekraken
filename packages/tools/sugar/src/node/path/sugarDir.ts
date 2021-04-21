// @ts-nocheck

import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';
/**
 * @name                            sugarDir
 * @namespace            node.path
 * @type                            Function
 * @stable
 *
 * Return the sugar package directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your sugarDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import sugarDir from '@coffeekraken/node/fs/sugarDir';
 * sugarDir(); // => '/something/node_modules/@coffeekraken/sugar'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISugarDirSettings {}

export interface ISugarDir {
  (settings?: ISugarDirSettings): string;
}

export default function (settings: ISugarDirSettings = {}) {
  settings = {
    ...settings
  };
  const sugarDir = __sugarConfig('storage.sugarDir');
  if (sugarDir !== undefined) {
    __fs.ensureDirSync(sugarDir);
    return sugarDir;
  }
}
