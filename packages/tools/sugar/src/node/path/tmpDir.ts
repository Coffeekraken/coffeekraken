// @ts-nocheck

import __tmpDir from 'temp-dir';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs-extra';

/**
 * @name                            tmpDir
 * @namespace           sugar.node.path
 * @type                            Function
 * @stable
 *
 * Return the os temp directory path
 *
 * @param       {ITmpDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your tmpDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import tmpDir from '@coffeekraken/node/fs/tmpDir';
 * tmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ITmpDirSettings {
  scope?: 'local' | 'global';
}

export interface ITmpDir {
  (settings?: ITmpDirSettings): string;
}

const fn: ITmpDir = function (settings: ITmpDirSettings = {}) {
  settings = {
    scope: 'local',
    ...settings
  };
  if (settings.scope === 'local') {
    const tmpDir = __sugarConfig('storage.tmpDir');
    if (tmpDir !== undefined) {
      __fs.ensureDirSync(tmpDir);
      return tmpDir;
    }
  }
  __fs.ensureDirSync(__tmpDir);
  return __tmpDir;
};
export default fn;
