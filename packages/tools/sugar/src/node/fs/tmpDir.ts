// @ts-nocheck

import __tmpDir from 'temp-dir';

/**
 * @name                            tmpDir
 * @namespace           sugar.node.fs
 * @type                            Function
 * @stable
 *
 * Return the os temp directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import tmpDir from '@coffeekraken/node/fs/tmpDir';
 * tmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function tmp () {
  return __tmpDir;
}
export = tmp;