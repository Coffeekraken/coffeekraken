// @ts-nocheck

import __fs from 'fs';
import __deepMerge from '../object/deepMerge';

/**
 * @name            folder
 * @namespace           sugar.node.is
 * @type            Function
 * @stable
 *
 * This function check if the passed string path is a folder or not
 *
 * @param     {String}        path        The path to check
 * @return    {Boolean}                   true if is a folder, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import isfolder from '@coffeekraken/sugar/node/is/folder';
 * isfolder('something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isfolder(path, settings = {}) {
  settings = __deepMerge(
    {
      symlink: true
    },
    settings
  );

  let isMatching = __fs.existsSync(path);
  if (!isMatching) return false;
  if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path);
    isMatching = isMatching && __fs.lstatSync(realPath).isDirectory();
  } else {
    isMatching = isMatching && __fs.lstatSync(path).isDirectory();
  }
  return isMatching;
}
export default isfolder;
