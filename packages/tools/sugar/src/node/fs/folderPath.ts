// @ts-nocheck

import __isPath from './isPath';
import __replacePathTokens from '../path/replacePathTokens';

/**
 * @name                folderPath
 * @namespace            node.fs
 * @type                Function
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function returns you the folder path of the file path passed.
 * You can tell the function to check for file existence before getting
 * the folder path with the second parameter.
 * Support the ```replacePathTokens``` tokens
 *
 * @param           {String}            path            The file path to get folder path from
 * @param           {Boolean}        [checkExistence=false]        Specify if you want to check the file existence before
 * @return          {String|Boolean}                    The folder path or false if not exists
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import folderPath from '@coffeekraken/sugar/node/fs/folderPath';
 * folderPath('my/cool/path.js'); // => true
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function folderPath(path, checkExistence = false) {
  path = __replacePathTokens(path);
  if (checkExistence) {
    if (!__isPath(path, true)) return false;
  }
  const parts = path.split('/');
  if (parts.length <= 1) {
    return '';
  }
  return parts.slice(0, -1).join('/');
}
export default folderPath;
