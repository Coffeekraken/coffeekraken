"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO tests
/**
 * @name        moveSync
 * @namespace           sugar.node.fs
 * @type          Function
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function moveSync(src, dest) {
    _fs.moveSync(src, dest);
}
exports.default = moveSync;
