// @ts-nocheck

import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        ensureDirSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureDirSync from '@coffeekraken/node/fs/ensureDirSync';
 * try {
 *    ensureDirSync('my/cool/dir');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureDirSync(dir) {
  dir = __replacePathTokens(dir);
  __fs.ensureDirSync(dir);
}
export default ensureDirSync;
