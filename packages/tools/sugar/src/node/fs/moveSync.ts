// @ts-nocheck

import __fs from 'fs-extra';

/**
 * @name        moveSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          stable
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @example       js
 * import moveSync from '@coffeekraken/node/fs/moveSync';
 * try {
 *    moveSync('my/cool/dir', 'another/place/for/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function moveSync(src, dest) {
    _fs.moveSync(src, dest);
}
export default moveSync;
