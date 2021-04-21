// @ts-nocheck

import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name        ensureFileSync
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import ensureFileSync from '@coffeekraken/node/fs/ensureFileSync';
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ensureFileSync(file) {
  file = __replacePathTokens(file);
  __fs.ensureFileSync(file);
}
export default ensureFileSync;
