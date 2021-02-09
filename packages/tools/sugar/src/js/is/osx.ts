// @ts-nocheck
// @shared

// TODO tests

/**
 * @name                            osx
 * @namespace           sugar.js.is
 * @type                            Function
 * @stable
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/osx';
 * isOsx(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function osx() {
  if (process && process.platform) {
    return process.platform === 'darwin';
  }
  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
export default osx;
