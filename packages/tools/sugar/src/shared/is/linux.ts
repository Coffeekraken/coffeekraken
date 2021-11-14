// @ts-nocheck

// TODO tests

/**
 * @name                            linux
 * @namespace            js.is
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import isLinux from '@coffeekraken/sugar/js/is/linux';
 * isLinux(); // => true
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function linux() {
    if (process && process.platform) {
        return process.platform === 'linux';
    }
    return navigator.platform.toUpperCase().indexOf('LINUX') >= 0;
}
export default linux;
