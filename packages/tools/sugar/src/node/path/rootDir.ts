// @ts-nocheck

import __sugarConfig from '../config/sugar';
import __ensureDirSync from '../fs/ensureDirSync';

/**
 * @name                            rootDir
 * @namespace           sugar.node.path
 * @type                            Function
 * @stable
 *
 * Return the package root directory path
 *
 * @param       {IRootDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @setting     {String}        [scope='local']         Specify the scope in which you want your rootDir to be returned. Can be "local" or "global"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import rootDir from '@coffeekraken/node/fs/rootDir';
 * rootDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IRootDirSettings {
  scope?: 'local' | 'global';
}

export default interface IRootDir {
  (settings?: IRootDirSettings): string;
}

const fn: IrootDir = function (settings: IRootDirSettings = {}) {
  settings = {
    scope: 'local',
    ...settings
  };
  if (settings.scope === 'local') {
    const rootDir = __sugarConfig('storage.rootDir');
    if (rootDir !== undefined) {
      __ensureDirSync(rootDir);
      return rootDir;
    }
  }
  return '/';
};
export = fn;
