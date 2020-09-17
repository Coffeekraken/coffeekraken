// TODO tests

/**
 * @name                            linux
 * @namespace           sugar.js.is
 * @type                            Function
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @example       js
 * import isLinux from '@coffeekraken/sugar/js/is/linux';
 * isLinux(); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function linux() {
  if (process && process.platform) {
    return process.platform === 'linux';
  }
  return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
}
