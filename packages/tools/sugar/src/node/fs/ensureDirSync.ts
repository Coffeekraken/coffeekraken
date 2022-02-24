// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        ensureDirSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * import ensureDirSync from '@coffeekraken/node/fs/ensureDirSync';
 * try {
 *    ensureDirSync('my/cool/dir');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ensureDirSync(dir) {
    __fs.ensureDirSync(dir);
}
export default ensureDirSync;
