// @ts-nocheck

import __isValidPath from 'is-valid-path';
import __fs from 'fs';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name                            isPath
 * @namespace            node.fs
 * @type                            Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * Check if the passed string is a valid path or not
 * Support the ```replacePathTokens``` tokens
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/fs/isPath';
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPath(path, checkExistence = false) {
  path = __replacePathTokens(path);

  // check if we have some /
  if (!path.includes('/')) return false;

  // check if the path is valid or not
  if (!__isValidPath(path)) return false;

  // if we have to check the path existence
  if (checkExistence) {
    if (!__fs.existsSync(path)) return false;
  }

  // otherwise, all is ok
  return true;
}
export default isPath;
