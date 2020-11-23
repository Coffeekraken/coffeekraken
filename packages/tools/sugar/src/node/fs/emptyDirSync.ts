import __fs from 'fs-extra';

// TODO tests

/**
 * @name        emptyDirSync
 * @namespace           sugar.node.fs
 * @type          Function
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function emptyDirSync(dir) {
  __fs.emptyDirSync(dir);
}
