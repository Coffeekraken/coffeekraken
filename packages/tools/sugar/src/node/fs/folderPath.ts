import __isPath from './isPath';

/**
 * @name                folderPath
 * @namespace           sugar.node.fs
 * @type                Function
 *
 * This function returns you the folder path of the file path passed.
 * You can tell the function to check for file existence before getting
 * the folder path with the second parameter.
 *
 * @param           {String}            path            The file path to get folder path from
 * @param           {Boolean}        [checkExistence=false]        Specify if you want to check the file existence before
 * @return          {String|Boolean}                    The folder path or false if not exists
 *
 * @example         js
 * import folderPath from '@coffeekraken/sugar/node/fs/folderPath';
 * folderPath('my/cool/path.js'); // => true
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function folderPath(path, checkExistence = false) {
  if (checkExistence) {
    if (!__isPath(path, true)) return false;
  }
  const parts = path.split('/');
  if (parts.length <= 1) {
    return '';
  }
  return parts.slice(0, -1).join('/');
}
