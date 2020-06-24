// TODO tests

/**
 * @name                            windows
 * @namespace           js.is
 * @type                            Function
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/windows';
 * isWindows(); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function windows() {
  if (process && process.platform) {
    return process.platform === 'win32';
  }
  return navigator.platform.toUpperCase().indexOf('WIN') > -1;
}
