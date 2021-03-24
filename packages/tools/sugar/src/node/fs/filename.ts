// @ts-nocheck

import __extension from './extension';

/**
 * @name                       filename
 * @namespace           sugar.node.fs
 * @type                        Function
 * @stable
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import filename from '@coffeekraken/sugar/node/fs/filename';
 * filename('hello/world.js'); // => world.js
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function filename(path, withExtension = true) {
  let filename = path.split('/').pop();
  if (!withExtension) {
    filename = filename.replace(__extension(filename), '');
  }
  return filename;
}
export default filename;
