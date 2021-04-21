// @ts-nocheck

import __fs from 'fs';

/**
 * @name            symlink
 * @namespace            node.is
 * @type            Function
 * @stable
 *
 * This function check if the passed string path is a sySlink or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a sySlink, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isSymlink from '@coffeekraken/sugar/node/is/symlink';
 * isSymlink('something/cool');
 *
 * @todo        Tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isSymlink(path) {
  return __fs.existsSync(path) && __fs.lstatSync(path).isSymbolicLink();
}
export default isSymlink;
