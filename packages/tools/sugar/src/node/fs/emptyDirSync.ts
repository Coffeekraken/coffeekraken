// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        emptyDirSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Empty a directory (sync)
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @example       js
 * import emptyDirSync from '@coffeekraken/node/fs/emptyDirSync';
 * try {
 *    emptyDirSync('my/cool/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function emptyDirSync(dir) {
    __fs.emptyDirSync(dir);
}
export default emptyDirSync;
