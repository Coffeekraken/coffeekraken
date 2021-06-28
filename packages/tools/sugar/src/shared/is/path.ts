// @ts-nocheck

import __isValidPath from 'is-valid-path';

/**
 * @name                            path
 * @namespace           node.is
 * @type                            Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/js/is/path';
 * isPath('hello/world'); // => true
 *
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function path(path) {
  // check if the path is valid or not
  if (!__isValidPath(path)) return false;
  // otherwise, all is ok
  return true;
}
export default path;
