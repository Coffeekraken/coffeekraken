// @ts-nocheck

/**
 * @name                            windows
 * @namespace            js.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/windows';
 * isWindows(); // => true
 *
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function windows() {
    if (process && process.platform) {
        return process.platform === 'win32';
    }
    return navigator.platform.toUpperCase().indexOf('WIN') > -1;
}
export default windows;
