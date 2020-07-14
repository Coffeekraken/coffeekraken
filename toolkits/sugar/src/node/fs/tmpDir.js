const __tmpDir = require('temp-dir');

// TODO tests

/**
 * @name                            tmpDir
 * @namespace           node.fs
 * @type                            Function
 *
 * Return the os temp directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @example             js
 * const tmpDir = require('@coffeekraken/node/fs/tmpDir');
 * tmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function () {
  return __tmpDir;
};
