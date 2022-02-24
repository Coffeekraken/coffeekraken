// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        ensureFileSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @example       js
 * import ensureFileSync from '@coffeekraken/node/fs/ensureFileSync';
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ensureFileSync(file) {
    __fs.ensureFileSync(file);
}
export default ensureFileSync;
