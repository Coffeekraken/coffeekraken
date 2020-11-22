// TODO tests
/**
 * @name                            osx
 * @namespace           sugar.js.is
 * @type                            Function
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/osx';
 * isOsx(); // => true
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function osx() {
    if (process && process.platform) {
        return process.platform === 'darwin';
    }
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}
