import __isValidPath from 'is-valid-path';

/**
 * @name                            path
 * @namespace                       sugar.node.is
 * @type                            Function
 * 
 * Check if the passed string is a valid path or not
 * 
 * @param         {String}            path              The path to check
 * @return        {Boolean}                             true if the path is valide, false if not
 * 
 * @example       js
 * import isPath from '@coffeekraken/sugar/js/is/path';
 * isPath('hello/world'); // => true
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function path(path) {
  // check if the path is valid or not
  if (!__isValidPath(path)) return false;
  // otherwise, all is ok
  return true;
}