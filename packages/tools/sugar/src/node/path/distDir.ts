// @ts-nocheck

import __sugarConfig from '../config/sugar';
import __ensureDirSync from '../fs/ensureDirSync';

/**
 * @name                            distDir
 * @namespace               sugar.node.path
 * @type                            Function
 * @stable
 *
 * Return the package dist directory path
 *
 * @param       {IDistDirSettings}       [settings={}]   Some settings to configure your temp directory process
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import distDir from '@coffeekraken/node/fs/distDir';
 * distDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IDistDirSettings {}

export default interface IDistDir {
  (settings?: IDistDirSettings): string;
}

const fn: IDistDir = function (settings: IDistDirSettings = {}) {
  settings = {
    ...settings
  };
  const distDir = __sugarConfig('storage.distDir');
  if (distDir !== undefined) {
    __ensureDirSync(distDir);
    return distDir;
  }
  return undefined;
};
export = fn;
