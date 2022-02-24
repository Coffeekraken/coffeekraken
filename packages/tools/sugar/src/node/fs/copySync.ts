// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        copySync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          beta
 *
 * Copy a file or directory (sync)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @example       js
 * import copySync from '@coffeekraken/node/fs/copySync';
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function copySync(src, dest) {
    __fs.copySync(src, dest);
}
export default copySync;
