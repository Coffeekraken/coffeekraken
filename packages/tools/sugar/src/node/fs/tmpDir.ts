// @ts-nocheck

import ITmpDir, { ITmpDirSettings } from './interface/ITmpDir';

import __tmpDir from 'temp-dir';
import __sugarConfig from '../config/sugar';
import __ensureDirSync from './ensureDirSync';

/**
 * @name                            tmpDir
 * @namespace           sugar.node.fs
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
const fn: ITmpDir = function (settings: ITmpDirSettings = {}) {
  settings = {
    scope: 'local',
    ...settings
  };
  if (settings.scope === 'local') {
    const tmpDir = __sugarConfig('storage.tempDir');
    if (tmpDir !== undefined) {
      __ensureDirSync(tmpDir);
      return tmpDir;
    }
  }
  __ensureDirSync(__tmpDir);
  return __tmpDir;
};
export = fn;
